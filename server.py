"""Server for inner-join friendship app."""

import os
from flask import Flask, render_template, request, flash, session, redirect, jsonify, abort, g
from model import (connect_to_db, db, User, Category_tag, Group, UserTag, UserGroup, GroupTag, ChatRoom, RoomMember,
                   Message, get_utc_timestamp)
import crud
from jinja2 import StrictUndefined
from sqlalchemy import func
from flask_migrate import Migrate
from events import socketio
from functools import wraps
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.secret_key = os.environ["FLASK_SECRET_KEY"]
app.jinja_env.undefined = StrictUndefined
connect_to_db(app)
socketio.init_app(app)
bcrypt = Bcrypt(app)


def protected_api(func):
    """Protect backend api."""

    @wraps(func)
    def wrapper(*args, **kwargs):
        user_id = session.get('user_id')
        if user_id:
            user_obj: User = User.query.filter(User.user_id == user_id).first()
            
            if user_obj is None:
                return jsonify(success=0, msg='invalid user'), 401

            else:
                # cache user obj with g
                g.user = user_obj
        else:
            # block unAuthorized visit and protect backend api
            return jsonify(success=0, msg='login required'), 401     
        
        return func(*args, **kwargs)

    return wrapper



@app.route('/')
def homepage():
    """View homepage."""
    return render_template("homepage.html")



@app.route('/<path:sub_path>')
def route(sub_path):
    return render_template('homepage.html')



@app.route("/api/login", methods=["POST"])
def process_login():
    """Process user login."""

    data = request.json
    email = data.get("email")
    password = data.get("password")

    user_obj = crud.get_user_by_email(email)

    if user_obj:
        hashed_password = user_obj.password
        if bcrypt.check_password_hash(hashed_password, password): 
            session['user_id'] = user_obj.user_id
            return jsonify(dict(success=True, user_id=user_obj.user_id, username=user_obj.username, fname=user_obj.fname,
                                lname=user_obj.lname,
                                email=user_obj.email)), 200
    else:
        return jsonify({'success': False}), 401
 


@app.route("/api/register", methods=["POST"])
def register_user():
    """Create a new user."""

    data = request.json
    fname = data.get("fname")
    lname = data.get("lname")
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    email_exists = crud.get_user_by_email(email)
    username_exists = crud.get_user_by_username(username)
    if username_exists or email_exists:
        return jsonify({'success': False}), 401
    else:
        user_obj = User.create(username=username, email=email, password=hashed_password, fname=fname, lname=lname)
        db.session.add(user_obj)
        db.session.commit()

        session['user_id'] = user_obj.user_id

        return jsonify(dict(success=True, user_id=user_obj.user_id, username=user_obj.username, fname=user_obj.fname,
                            lname=user_obj.lname,
                            email=user_obj.email)), 200



@app.route('/api/user/echo')
@protected_api
def get_user_info():
    """Echo current user."""
    user_obj: User = g.user
    return jsonify(success=True, user_id=user_obj.user_id, username=user_obj.username, fname=user_obj.fname,
                   lname=user_obj.lname,
                   email=user_obj.email)



@app.route("/api/select-categories", methods=["POST"])
@protected_api
def select_category():
    """Get user category selections and save to database."""
    
    data = request.get_json()
    selections = data.get('selectedCategories', [])

    user = g.user

    for category in selections:
        selected_category = crud.get_category_by_name(category.lower())
        user_tag=UserTag(user_id=user.user_id,category_tag_id=selected_category.category_tag_id)
        db.session.add(user_tag)
        db.session.commit()

    return jsonify({'message': 'Selections saved successfully'})



@app.route("/api/get-user-tags", methods=["POST"])
@protected_api
def get_user_categories():
    """Get current user's category tags."""
    user = g.user
    user_tags = user.category_tags
    user_tag_names = []
    for tag in user_tags:
        user_tag_names.append(tag.category_tag_name)
    
    return jsonify(user_tag_names)



@app.route("/api/submit-user-info", methods=["POST"])
@protected_api
def submit_user_info():
    """Save user info to database."""
    
    user = g.user
    user_id = user.user_id 

    data = request.json
    gender = data.get('gender')
    zipcode = data.get('zipCode')
    birthMonth = data.get('birthMonth')
    birthDay = data.get('birthDay')
    birthYear = data.get('birthYear')
    ethnicity = data.get('ethnicity')
    occupation = data.get('occupation')

    formatted_date = crud.format_birthdate(birthMonth, birthDay, birthYear)

    crud.update_user_info(user_id, gender, formatted_date, ethnicity, zipcode, occupation)
    
    combined_list = []

    for element in ['hobbies', 'culturalBackground', 'supportGroups', 'work', 'college', 'highSchool']:
        item = data.get(element, [])
        if isinstance(item, str):
            combined_list.append(item)
        elif isinstance(item, list):
            combined_list.extend(item)

    for item in combined_list:
        item = item.capitalize()
        group = Group.query.filter_by(group_name=item).first()
        if group:
            group_id = group.group_id
            user_group = UserGroup(user_id=user_id, group_id=group_id)
            db.session.add(user_group)
            db.session.commit()

    response = {'message': 'Information submitted successfully'}
    return jsonify(response), 200



@app.route("/api/get-user-groups", methods=["POST"])
@protected_api
def get_user_groups():
    """Get current user's groups."""

    user = g.user
    user_groups = user.groups
    user_id = user.user_id
    
    # group is formed when there is more than 1 user in a group
    groups_formed = []
    for group in user_groups:
        group_id = group.group_id
        user_count_in_group = (
        db.session.query(func.count(UserGroup.user_id).label('user_count'))
        .filter(UserGroup.group_id == group_id)
        .scalar())

        if user_count_in_group > 1:
            groups_formed.append(group.group_name)
       
    groups = {}
    for group in groups_formed:
        tag_img_dict = {}
        
        group_obj = crud.get_group_by_name(group)
        tag_obj = group_obj.category_tags
        tag = tag_obj[0]
        
        tag_img_dict["categoryName"] = tag.category_tag_name
        tag_img_dict['imgURL'] = tag.img_url
        groups[group_obj.group_name] = tag_img_dict
    
    return jsonify(groups)



@app.route('/api/open-chatroom', methods=['post'])
@protected_api
def user_open_chatroom():
    """
    user open a chatroom, create it if not exists, and make sure user joins it
    """

    user_obj: User = g.user

    data = request.get_json()
    group_name = data.get('group_name')
    category_name = data.get('category_name')
    action = data.get('action')

    room_obj: ChatRoom = ChatRoom.query.filter(ChatRoom.group_name == group_name).filter(
        ChatRoom.category_name == category_name).first()
    if room_obj is None:
        room_obj = ChatRoom()
        room_obj.group_name = group_name
        room_obj.category_name = category_name
        db.session.add(room_obj)
        db.session.commit()

    # if this chatroom members' count smaller than 2, then find group members
    if db.session.query(RoomMember.id).join(ChatRoom, RoomMember.room_id == ChatRoom.id).filter(
            ChatRoom.id == room_obj.id).count() < 2:
        ChatRoom.discover_group_members(room_id=room_obj.id)

    RoomMember.ensure_membership(room_id=room_obj.id, user_id=user_obj.user_id)

    if action is None:
        return jsonify(success=1)

    online_members, offline_members = RoomMember.batch_check_members_status(room_id=room_obj.id)

    members = []
    for (user_id, fname, lname, email, joined_at, last_seen, last_speak) in db.session.query(User.user_id, User.fname,
                                                                                             User.lname,
                                                                                             User.email,
                                                                                             RoomMember.joined_at,
                                                                                             RoomMember.last_seen,
                                                                                             RoomMember.last_speak).join(
        RoomMember, RoomMember.user_id == User.user_id).filter(RoomMember.room_id == room_obj.id).order_by(
        RoomMember.joined_at.desc()).all():
        is_online = True if user_id in online_members else False
        members.append(
            dict(user_id=user_id, fname=fname, lname=lname, email=email, joined_at=joined_at, last_seen=last_seen,
                 last_speak=last_speak,
                 is_online=is_online))

    messages = []
    for (message_id, room_id, content, created_at,
         sender_id, sender_fname, sender_lname, sender_email) in db.session.query(Message.id,
                                                                                  Message.room_id,
                                                                                  Message.content,
                                                                                  Message.created_at,
                                                                                  User.user_id,
                                                                                  User.fname,
                                                                                  User.lname,
                                                                                  User.email, ).filter(
        Message.room_id == room_obj.id).join(
        User, User.user_id == Message.sender_id).order_by(Message.created_at.asc()).limit(1024).all():
        messages.append(dict(message_id=message_id, room_id=room_id, content=content, created_at=created_at,
                             sender_id=sender_id, sender_fname=sender_fname, sender_lname=sender_lname,
                             sender_email=sender_email))
    return jsonify(success=1, messages=messages, members=members,
                   room=dict(id=room_obj.id, group_name=room_obj.group_name, category_name=room_obj.category_name))



@app.route('/api/user/logout')
def logout():
    """Log out current user."""
    # mark user as offline in all chat rooms
    user_id = session.get('user_id')
    if user_id:
        print('Logout')
        db.session.query(RoomMember).filter(RoomMember.user_id == user_id).update(dict(
            is_online=False,
            last_seen=get_utc_timestamp(),
        ))
        db.session.commit()
    session.clear()
    return jsonify(success=1)  



@app.route("/api/get-group-members", methods=["POST"])
@protected_api
def get_group_members():
    """Get all the group members of a group."""
    
    data = request.get_json()
    group_name = data.get('group_name')
    
    group_obj = crud.get_group_by_name(group_name)
    group_id = group_obj.group_id
    print(group_id)
    users_in_group = (
        db.session.query(User)
        .join(UserGroup, User.user_id == UserGroup.user_id)
        .filter(UserGroup.group_id == group_id)
    .all())

    lst = []
    
    for user in users_in_group:
        dict = {}
        dict["user_id"] = user.user_id
        dict["username"] = user.username
        dict["fname"] = user.fname
        dict["lname"] = user.lname
        dict["gender"] = user.gender
        dict["age"] = user.age
        dict["ethnicity"] = user.ethnicity
        dict["occupation"] = user.occupation
        dict["zipcode"] = user.zipcode 
        lst.append(dict)
    print(lst)

    if not lst:
       return jsonify({'no group members found'}), 204
    else:
        return jsonify(lst)



@app.route("/api/get-super-match", methods=["POST"])
@protected_api
def get_super_match():
    """Get all the users who share at least 2 common groups with the current user."""

    # groups current_user is in 
    current_user = g.user
    current_user_groups = []
    for group in current_user.groups:
        current_user_groups.append(group.group_name)

    # all users
    all_user_obj = crud.all_users()
    all_users = []
    for user in all_user_obj:
        if user.user_id != current_user.user_id:
            all_users.append(user)

    super_match_user_list = []
    super_match_user_dict = {}
    for user in all_users:
        if user.user_id != current_user.user_id:
            count = 0
            groups = []
            for group in user.groups:
                groups.append(group.group_name)

            for group in groups:
                if group in current_user_groups:
                    count += 1 
            if count >= 2: 
                super_match_user_dict = {}
                super_match_user_dict["user_id"] = user.user_id
                super_match_user_dict["username"] = user.username
                super_match_user_dict["fname"] = user.fname
                super_match_user_dict["lname"] = user.lname
                super_match_user_dict["gender"] = user.gender
                super_match_user_dict["age"] = user.age
                super_match_user_dict["ethnicity"] = user.ethnicity
                super_match_user_dict["occupation"] = user.occupation
                super_match_user_dict["zipcode"] = user.zipcode
                super_match_user_dict["groups"] = groups 
                super_match_user_dict["count"] = count
                super_match_user_list.append(super_match_user_dict)

    if not super_match_user_list:
       return jsonify({'no super match users found'}), 204
    else:
        return jsonify(super_match_user_list)





if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', port=5000, debug=True, allow_unsafe_werkzeug=True)