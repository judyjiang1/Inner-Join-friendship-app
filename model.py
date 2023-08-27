"""Data models for inner-join friendship app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    """A user."""

    __tablename__ = 'users'

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    fname = db.Column(db.String, nullable=False)
    lname = db.Column(db.String, nullable=False)
    gender = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    ethnicity = db.Column(db.String)
    personality_type = db.Column(db.String)
    occupation = db.Column(db.String)
    city_code = db.Column(db.Integer, nullable=False)
    state_code = db.Column(db.Integer, nullable=False)
    zipcode = db.Column(db.String, nullable=False)
    
    category_tags = db.relationship("Category_tag", secondary="user_tags", back_populates="users")
    groups = db.relationship("Group", secondary="user_groups", back_populates="users")

    def __repr__(self):
        return f"<User user_id={self.user_id} email={self.email}>"
    
    @classmethod
    def create(cls, username, email, password, first_name, last_name, gender, age, city_code, state_code, zipcode, ethnicity=None, personality_type=None, occupation=None):
       """Create and return a new user."""
       return cls(username=username, email=email, password=password, first_name=first_name, last_name=last_name, gender=gender, age=age, ethnicity=ethnicity, personality_type=personality_type, occupation=occupation, city_code=city_code, state_code=state_code, zipcode=zipcode)

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
    category_name = db.Column(db.String, nullable=False)

    users = db.relationship("User", secondary="user_tags", back_populates="category_tags")
    groups = db.relationship("Group", secondary="group_tags", back_populates="category_tags")

    def __repr__(self):
        return f"<Category category_tag_id={self.category_tag_id} category_name={self.category_name}>"
    
    @classmethod
    def create(cls, category_tag_id, category_tag_name):
        """Create and return a new category tag."""
        return cls(category_tag_id=category_tag_id, category_tag_name=category_tag_name)
    
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
    matched_at = db.Column(db.String, nullable=False)
    active_status = db.Column(db.Boolean, nullable=False)
    user_defined = db.Column(db.Boolean, nullable=False)

    category_tags = db.relationship("Category_tag", secondary="group_tags", back_populates="groups")
    users = db.relationship("User", secondary="user_groups", back_populates="groups")

    def __repr__(self):
        return f"<Group group_id={self.group_id}>"
    
    @classmethod
    def create(cls, group_id, matched_at, active_status, user_defined):
        """Create and return a new group."""
        return cls(group_id=group_id, matched_at=matched_at, active_status=active_status, user_defined=user_defined)
    
    # @classmethod
    # def get_by_id(cls, group_id):
    #     return cls.query.get(group_id)

    # @classmethod
    # def all_category_tags(cls):
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



def connect_to_db(flask_app, db_uri="postgresql:///ratings", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")



if __name__ == "__main__":
    from server import app
    connect_to_db(app)