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

app = Flask(__name__)
app.secret_key = os.environ["FLASK_SECRET_KEY"]
app.jinja_env.undefined = StrictUndefined
connect_to_db(app)
# Migrate(app, db)
# register flask socket-IO
socketio.init_app(app)



def protected_api(f):
    """Protect backend api."""

    @wraps(f)
    def wrapper(*args, **kwargs):
        user_id = session.get('user_id')
        if user_id:
            user_obj: User = User.query.filter(User.user_id == user_id).first()
            
            # deleted user 
            if user_obj is None:
                return jsonify(success=0, msg='protected'), 401

            # cache user obj with g
            g.user = user_obj
            return f(*args, **kwargs)

        # block unAuthorized visit and protect backend api
        return jsonify(success=0, msg='protected'), 401

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

    if not user_obj or user_obj.password != password:
        return jsonify({'success': False}), 401
    
    else:
         session['user_id'] = user_obj.user_id
        # flash(f"Welcome back, {user_obj.email}!")

    return jsonify(dict(success=True, user_id=user_obj.user_id, username=user_obj.username, fname=user_obj.fname,
                            lname=user_obj.lname,
                            email=user_obj.email)), 200
        


@app.route("/api/register", methods=["POST"])
def register_user():
    """Create a new user."""

    data = request.json
    fname = data.get("fname")
    lname = data.get("lname")
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    user_obj = crud.get_user_by_email(email)
    if user_obj:
        return jsonify({'success': False}), 401
    else:
        user_obj = User.create(username=username, email=email, password=password, fname=fname, lname=lname)
        db.session.add(user_obj)
        db.session.commit()

        session['user_id'] = user_obj.user_id

        return jsonify(dict(success=True, user_id=user_obj.user_id, username=user_obj.username, fname=user_obj.fname,
                            lname=user_obj.lname,
                            email=user_obj.email)), 200



@app.route("/api/select-categories", methods=["POST"])
@protected_api
def select_category():
    """Get user category selections and save to database."""
    
    data = request.get_json()
    selections = data.get('selectedCategories', [])
    
    user = g.user

    for category in selections:
        selected_category = crud.get_category_by_name(category.lower())
        # print(selected_category)
        user_tag=UserTag(user_id=user.user_id,category_tag_id=selected_category.category_tag_id)
        db.session.add(user_tag)
        db.session.commit()

    # print(selections)
    return jsonify({'message': 'Selections saved successfully'})



@app.route("/api/get-user-tags", methods=["POST"])
@protected_api
def get_user_categories():
    user = g.user
    user_tags = user.category_tags
    user_tag_names = []
    for tag in user_tags:
        user_tag_names.append(tag.category_tag_name)
    
    return jsonify(user_tag_names)



@app.route("/api/submit-user-info", methods=["POST"])
@protected_api
def submit_user_info():
    user = g.user
    user_id = user.user_id 

    data = request.json
    gender = data.get('gender')
    zip_code = data.get('zipcode')
    birthMonth = data.get('birthMonth')
    birthDay = data.get('birthDay')
    birthYear = data.get('birthYear')
    ethnicity = data.get('ethnicity')
    occupation = data.get('occupation')

    formatted_date = crud.format_birthdate(birthMonth, birthDay, birthYear)

    crud.update_user_info(user_id, gender, formatted_date, ethnicity,zip_code,occupation)

    
    combined_list = []

    for element in ['hobbies', 'culturalBackground', 'supportGroups', 'work', 'college', 'highSchool']:
        item = data.get(element, [])
        if isinstance(item, str):
            combined_list.append(item)
        elif isinstance(item, list):
            combined_list.extend(item)

    for item in combined_list:
        item = item.capitalize()
        print(item)
        group = Group.query.filter_by(group_name=item).first()
        print(group)
        if group:
            group_id = group.group_id
            user_group = UserGroup(user_id=user_id, group_id=group_id)
            db.session.add(user_group)
            db.session.commit()

    response = {'message': 'Information submitted successfully'}
    return jsonify(response), 200



@app.route("/api/get-user-groups_participants", methods=["POST"])
@protected_api
def get_user_groups_participants():

    user = g.user
    user_groups = user.groups
    user_id = user.user_id
    
    
    # this will show groups and its participants 
    group_users = {}
    basic_group_formed = []
    for group in user_groups:
        group_id = group.group_id
        user_count_in_group = (
        db.session.query(func.count(UserGroup.user_id).label('user_count'))
        .filter(UserGroup.group_id == group_id)
        .scalar())

        if user_count_in_group > 1:
            basic_group_formed.append(group.group_name)
       
    
    for group in basic_group_formed:
        group_obj = crud.get_group_by_name(group)
        group_id = group_obj.group_id
        users_in_group = crud.get_users_in_group(group_id)
        
        users_in_group = (
        db.session.query(User)
        .join(UserGroup, User.user_id == UserGroup.user_id)
        .filter(UserGroup.group_id == group_id)
    .all())
        
        user_full_names = []
        for user in users_in_group:
            user_full_names.append(user.fname + ' ' + user.lname)
        group_users[group] = user_full_names
    
       
    # show all the groups of a particular user and its participants 
    return jsonify(group_users)


@app.route("/api/get-user-groups", methods=["POST"])
@protected_api
def get_user_groups():

    user = g.user
    user_groups = user.groups
    user_id = user.user_id
    
   
    # this will show groups and its images 
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



@app.route('/api/store-group-in-session/<group_name>', methods=['POST'])
@protected_api
def store_group_in_session(group_name):
    try:
        # Store group name in the session
        session['group_name'] = group_name
        return jsonify({'message': 'Group information stored in session'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    

@app.route('/api/my-groups/<group_name>')
@protected_api
def my_group(group_name):
    return jsonify({'group_name': group_name})



@app.route('/api/get-group-members', methods=["POST", "GET"])
@protected_api
def get_group_members():

    if 'email' in session:
        email = session['email']
    else:
        return jsonify({'error': 'Email not found in session'}), 400

    user = crud.get_user_by_email(email)
   
        
    if 'group_name' in session:
        group_name = session['group_name']
    else:
        return jsonify({'error': 'Group name not found in session'}), 400


    group_obj = crud.get_group_by_name(group_name)
    group_id = group_obj.group_id
    users_in_group = crud.get_users_in_group(group_id)
    
    users_in_group = (
    db.session.query(User)
    .join(UserGroup, User.user_id == UserGroup.user_id)
    .filter(UserGroup.group_id == group_id).all()) 

    user_full_names = {}
    for user in users_in_group:
        user_full_names[user.user_id] = user.fname + ' ' + user.lname
    
    return jsonify(user_full_names)


@app.route('/api/get-user')
@protected_api
def get_user():
    if 'email' in session:
        email = session['email']
    else:
        return jsonify({'message': 'User not logged in'}), 401

    user_obj = crud.get_user_by_email(email)
    user_fname = user_obj.fname
    

    return jsonify(user_fname)


@app.route('/check_login', methods=['GET'])
@protected_api
def check_login():
    if 'email' in session:
        email = session['email']
        user_obj = crud.get_user_by_email(email)
        user_fname = user_obj.fname
        return jsonify({'loggedIn': True, 'userfname': user_fname})
    else:
        return jsonify({'loggedIn': False})



@app.route('/api/logout')
@protected_api
def logout():
    session.clear()
    return jsonify({ "status": "success" })
   

# @app.route('/<path>')
# def route(path):

#     return render_template('homepage.html')




# @app.route("/users")
# def all_users():
#     """View all users."""

#     users = User.all_users()
#     tags = Category_tag.all_category_tags()
#     groups = Group.all_groups()
#     user_groups = crud.get_user_groups(user_id=1)
#     # user_tags = User.category_tags(user_id=1)

#     return render_template("all_users.html", users=users, tags=tags, groups=groups,user_groups=user_groups)



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3002, debug=True)
    # socketio.run(app, host='0.0.0.0', port=3001, debug=True)