"""Data models for inner-join friendship app."""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone

db = SQLAlchemy()

def get_utc_timestamp():
    """
    return timestamp at this very moment, integer, micro second, 1/1000 of one second
    """
    return int(datetime.now(tz=timezone.utc).timestamp() * 1000)


class User(db.Model):
    """A user."""

    __tablename__ = 'users'

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    fname = db.Column(db.String, nullable=False)
    lname = db.Column(db.String, nullable=False)
    gender = db.Column(db.String)
    age = db.Column(db.Integer)
    ethnicity = db.Column(db.String)
    occupation = db.Column(db.String)
    zipcode = db.Column(db.String)
    

    category_tags = db.relationship("Category_tag", secondary="user_tags", back_populates="users")
    groups = db.relationship("Group", secondary="user_groups", back_populates="users")

    def __repr__(self):
        return f"<User user_id={self.user_id} email={self.email}>"
    
    @classmethod
    def create(cls, username, email, password, fname, lname, gender=None, age=None, ethnicity=None, occupation=None, zipcode=0):
       """Create and return a new user."""
       return cls(username=username, email=email, password=password, fname=fname, lname=lname, gender=gender, age=age, 
                  ethnicity=ethnicity, occupation=occupation, zipcode=zipcode)

    @classmethod
    def update_user_info(cls, user_id, new_email, new_username, new_fname, new_lname, new_gender, new_age, new_ethnicity, new_occupation, new_zipcode):
        user = cls.query.get(user_id)
        user.username = new_username
        user.email = new_email
        user.fname = new_fname
        user.lname = new_lname
        user.gender = new_gender
        user.age = new_age
        user.ethnicity = new_ethnicity
        user.occupation = new_occupation
        user.zipcode = new_zipcode

   
    
class Category_tag(db.Model):
    """A category tag for group matching."""

    __tablename__ = 'category_tags'

    category_tag_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    category_tag_name = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String, nullable=False)

    users = db.relationship("User", secondary="user_tags", back_populates="category_tags")
    groups = db.relationship("Group", secondary="group_tags", back_populates="category_tags")

    def __init__(self, img_url, category_tag_name):
        self.img_url = img_url
        self.category_tag_name = category_tag_name
    
    
    def __repr__(self):
        return f"<Category category_tag_id={self.category_tag_id} category_name={self.category_tag_name}>"
    
    def to_dict(self):
        return {'category_tag_id': self.category_tag_id,
                'category_tag_name': self.category_tag_name,
                'image_url': self.img_url}

    @classmethod
    def create(cls, img_url, category_tag_name):
        """Create and return a new category tag."""
        return cls(img_url=img_url, category_tag_name=category_tag_name)
        


class UserTag(db.Model):
    """An association table for connecting users and tags. It shows tags a specific user is interested in for matching."""

    __tablename__ = 'user_tags'

    user_tag_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    category_tag_id = db.Column(db.Integer, db.ForeignKey("category_tags.category_tag_id"), nullable=False)

    def __repr__(self):
        return f"<UserTag user_id={self.user_id}>"
    


class Group(db.Model):
    """A group."""

    __tablename__ = 'groups'

    group_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    group_name = db.Column(db.String, nullable=False)
    # matched_at = db.Column(db.String)
    # active_status = db.Column(db.Boolean)
    # user_defined = db.Column(db.Boolean)

    category_tags = db.relationship("Category_tag", secondary="group_tags", back_populates="groups")
    users = db.relationship("User", secondary="user_groups", back_populates="groups")

    def __repr__(self):
        return f"<Group group_id={self.group_id}>"
    
    @classmethod
    def create(cls, group_name):
        """Create and return a new group."""
        return cls(group_name=group_name)
    
  
    
class GroupTag(db.Model):
    """An association table for connecting groups and tags. It shows tags a specific group has."""

    __tablename__ = 'group_tags'

    group_tag_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    category_tag_id = db.Column(db.Integer, db.ForeignKey("category_tags.category_tag_id"), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey("groups.group_id"), nullable=False)

    def __repr__(self):
        return f"<GroupTag group_tag_id={self.group_tag_id}>"
    


class UserGroup(db.Model):
    """An association table for connecting users and groups. It shows groups a specific user is part of."""

    __tablename__ = 'user_groups'

    user_group_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False )
    group_id = db.Column(db.Integer, db.ForeignKey("groups.group_id"), nullable=False)

    def __repr__(self):
        return f"<UserGroup user_group_id={self.user_group_id}>"



class ChatRoom(db.Model):
    __tablename__ = 'chat_room'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    group_name = db.Column(db.String, nullable=False)
    category_name = db.Column(db.String, nullable=False)

    @classmethod
    def find_chatroom_by_id(cls, room_id):
        room_obj: cls = cls.query.filter(cls.id == room_id).first()
        return room_obj

    @classmethod
    def discover_group_members(cls, room_id):
        """
        discover members of a group
        """
        res = []
        room_obj: cls = cls.find_chatroom_by_id(room_id=room_id)
        if room_obj is None:
            return res

        category_obj: Category_tag = Category_tag.query.filter(
            Category_tag.category_tag_name == room_obj.category_name).first()
        if category_obj is None:
            return res

        group_obj: Group = Group.query.join(GroupTag, GroupTag.group_id == Group.group_id).filter(
            Group.group_name == room_obj.group_name).filter(
            GroupTag.category_tag_id == category_obj.category_tag_id).first()
        if group_obj is None:
            return res

        for user_id, in db.session.query(User.user_id) \
                .join(UserGroup, UserGroup.user_id == User.user_id) \
                .filter(UserGroup.group_id == group_obj.group_id) \
                .all():
            res.append(user_id)

        existing_members = []
        for user_id, in db.session.query(RoomMember.user_id).filter(RoomMember.room_id == room_obj.id).all():
            existing_members.append(user_id)

        to_add_members = [i for i in res if i not in existing_members]

        now = get_utc_timestamp()
        for i in to_add_members:
            member_obj = RoomMember()
            member_obj.room_id = room_obj.id
            member_obj.user_id = i
            member_obj.last_seen = -1
            member_obj.joined_at = now
            member_obj.is_online = False

            db.session.add(member_obj)
            db.session.commit()

        return res



class RoomMember(db.Model):
    __tablename__ = 'chat_room_member'

    ONLINE_THRESHOLD = 3  # after 3 minutes user will be presumed offline

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)

    room_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)

    last_speak = db.Column(db.Integer, default=-1, server_default='-1')
    last_seen = db.Column(db.Integer, default=get_utc_timestamp)
    joined_at = db.Column(db.Integer, default=get_utc_timestamp)
    is_online = db.Column(db.Boolean, default=True, server_default='1')

    @classmethod
    def batch_check_members_status(cls, room_id):
        """
        last seen in 3 minutes, user is presumed online
        """
        online_members = []
        offline_members = []
        to_mark_offline = []
        now = get_utc_timestamp()
        threshold = cls.ONLINE_THRESHOLD * 60 * 1000
        for user_id, last_seen, is_online in db.session.query(cls.user_id, cls.last_seen, cls.is_online).filter(
                cls.room_id == room_id).all():
            flag = now - last_seen < threshold
            if is_online:
                if flag:
                    online_members.append(user_id)
                else:
                    offline_members.append(user_id)
                    to_mark_offline.append(user_id)
            else:
                offline_members.append(user_id)

        if len(to_mark_offline) > 0:
            cls.batch_mark_members_status(room_id=room_id, member_id_arr=to_mark_offline, status=False)

        return online_members, offline_members

    @classmethod
    def batch_mark_members_status(cls, room_id, member_id_arr, status):
        """
        mark members offline / online
        """
        db.session.query(cls).filter(cls.room_id == room_id).filter(cls.user_id.in_(member_id_arr)).update(
            dict(is_online=status))
        db.session.commit()

    @classmethod
    def update_online_status(cls, room_id, member_id, status):
        """
        update online status of a member
        """
        db.session.query(cls).filter(cls.room_id == room_id).filter(cls.user_id == member_id).update(
            dict(is_online=status))
        db.session.commit()

    @classmethod
    def update_last_seen(cls, room_id, member_id):
        """
        update last_seen value for a member
        """
        db.session.query(cls).filter(cls.room_id == room_id).filter(cls.user_id == member_id).update(
            dict(is_online=True, last_seen=get_utc_timestamp()))
        db.session.commit()

    @classmethod
    def update_last_speak(cls, room_id, member_id):
        """
        update last_speak value for a member
        """
        now = get_utc_timestamp()
        db.session.query(cls).filter(cls.room_id == room_id).filter(cls.user_id == member_id).update(
            dict(is_online=True, last_seen=now, last_speak=now))
        db.session.commit()
        return now

    @classmethod
    def ensure_membership(cls, room_id, user_id):
        """
        make sure user membership exist
        """
        # check if user exists
        user_obj: User = User.query.filter(User.user_id == user_id).first()
        if user_obj is None:
            return {}
        # check if room exists
        if db.session.query(cls.id).filter(cls.id == room_id).count() == 0:
            return {}

        member_ship: cls = cls.query.filter(RoomMember.room_id == room_id).filter(
            cls.user_id == user_id).first()
        if member_ship is None:
            member_ship = cls()
            member_ship.user_id = user_id
            member_ship.room_id = room_id

        # update user online status
        member_ship.last_seen = get_utc_timestamp()
        member_ship.is_online = True

        db.session.add(member_ship)
        db.session.commit()

        return dict(
            user_id=user_id, fname=user_obj.fname, lname=user_obj.lname, email=user_obj.email,
            joined_at=member_ship.joined_at, last_seen=member_ship.last_seen, lask_speak=member_ship.last_speak,
            is_online=member_ship.is_online)



class Message(db.Model):
    __tablename__ = 'chat_room_message'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)

    room_id = db.Column(db.Integer, nullable=False)
    sender_id = db.Column(db.Integer, nullable=False)
    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.Integer, default=get_utc_timestamp)



def connect_to_db(
        flask_app,
        db_uri="sqlite:///chat.db",
        echo=False
):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")



if __name__ == "__main__":
    from server import app
    connect_to_db(app)