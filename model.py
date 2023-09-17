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

    # @classmethod
    # def get_by_id(cls, user_id):
    #     return cls.query.get(user_id)

    # @classmethod
    # def get_by_email(cls, email):
    #     return cls.query.filter(User.email == email).first()

    # @classmethod
    # def all_users(cls):
    #     return cls.query.all()
    


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
    
    # @classmethod
    # def get_by_id(cls, category_tag_id):
    #     return cls.query.get(category_tag_id)

    # @classmethod
    # def all_category_tags(cls):
    #     return cls.query.all()

    


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
    matched_at = db.Column(db.String)
    active_status = db.Column(db.Boolean)
    user_defined = db.Column(db.Boolean)

    category_tags = db.relationship("Category_tag", secondary="group_tags", back_populates="groups")
    users = db.relationship("User", secondary="user_groups", back_populates="groups")

    def __repr__(self):
        return f"<Group group_id={self.group_id}>"
    
    @classmethod
    def create(cls, group_name, matched_at=None, active_status=None, user_defined=False):
        """Create and return a new group."""
        return cls(group_name=group_name, matched_at=matched_at, active_status=active_status, user_defined=user_defined)
    
    # @classmethod
    # def get_by_id(cls, group_id):
    #     return cls.query.get(group_id)

    # @classmethod
    # def all_groups(cls):
    #     return cls.query.all()
    

    
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
    def check_or_join_chatroom(cls, room_id, user_id):
        """
        make sure a user is joining a chatroom
        """
        # check if user exists
        user_obj: User = User.query.filter(User.user_id == user_id).first()
        if user_obj is None:
            return {}
        # check if room exists
        if db.session.query(cls.id).filter(cls.id == room_id).count() == 0:
            return {}
        obj: RoomMember = RoomMember.query.filter(RoomMember.room_id == room_id).filter(
            RoomMember.user_id == user_id).first()
        if obj is None:
            obj = RoomMember()
            obj.room_id = room_id
            obj.user_id = user_id

        obj.is_online = True
        obj.last_seen = get_utc_timestamp()
        db.session.add(obj)
        db.session.commit()
        return dict(user_id=user_id, fname=user_obj.fname, lname=user_obj.lname, email=user_obj.email,
                    joined_at=obj.joined_at, last_seen=obj.last_seen, is_online=obj.is_online)
    

class RoomMember(db.Model):
    __tablename__ = 'chat_room_member'

    ONLINE_THRESHOLD = 3  # after 3 minutes user will be presumed offline

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)

    room_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)

    last_seen = db.Column(db.Integer, default=get_utc_timestamp)
    joined_at = db.Column(db.Integer, default=get_utc_timestamp)
    is_online = db.Column(db.Boolean, default=True, server_default='1')


class Message(db.Model):
    __tablename__ = 'chat_room_message'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)

    room_id = db.Column(db.Integer, nullable=False)
    sender_id = db.Column(db.Integer, nullable=False)
    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.Integer, default=get_utc_timestamp)






def connect_to_db(flask_app, db_uri="postgresql:///friends", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")



if __name__ == "__main__":
    from server import app
    connect_to_db(app)