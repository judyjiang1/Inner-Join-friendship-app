"""CRUD operations."""

from model import db, User, Category_tag, Group, UserGroup, UserTag, connect_to_db
import json
from datetime import datetime
from sqlalchemy import func


# Users
def get_user_by_id(user_id):
    """Return a user by primary key."""
    return User.query.get(user_id)

def get_user_by_email(email):
    """Return a user by email."""
    return User.query.filter(User.email == email).first()

def get_user_by_username(username):
    """Return a user by username."""
    return User.query.filter(User.username == username).first()

def all_users():
    """Return all users."""
    return User.query.all()

def calculate_age(birthdate):
    birthdate = datetime.strptime(birthdate, '%m/%d/%Y')
    today = datetime.today()
    age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
    return age

def format_birthdate(birthMonth, birthDay, birthYear):
    dt = datetime.strptime(birthMonth, '%B')
    birthMonth = dt.month
    formatted_date = f"{birthMonth}/{birthDay}/{birthYear}"
    return formatted_date

def update_user_info(user_id, gender, birthdate, ethnicity, zipcode, occupation):
    user = User.query.get(user_id)
    user.gender = gender
    user.age = calculate_age(birthdate)
    user.ethnicity = ethnicity
    user.zipcode = zipcode 
    user.occupation = occupation


# Category_tags
def get_category_by_id(category_tag_id):
    """Return a category tag by primary key."""
    return Category_tag.query.get(category_tag_id)

def get_category_by_name(category_tag_name):
    """Return a category tag by name."""
    return Category_tag.query.filter(Category_tag.category_tag_name == category_tag_name).first()

def all_category_tags():
    """Return all category tags."""
    return Category_tag.query.all()


# Groups
def get_group_by_id(group_id):
    """Return a group by primary key."""
    return Group.query.get(group_id)

def get_group_by_name(group_name):
    """Return a group by name."""
    return Group.query.filter(Group.group_name == group_name).first()

def all_groups():
    """Return all groups."""
    return Group.query.all()

def get_users_in_group(group_id):
     """Return users in a group."""
     db.session.query(User).join(UserGroup, User.user_id == UserGroup.user_id).filter(UserGroup.group_id == group_id).all()




if __name__ == "__main__":
    from server import app
    connect_to_db(app)