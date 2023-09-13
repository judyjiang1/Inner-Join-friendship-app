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

def update_user_info(user_id, gender, birthdate, ethnicity, zipcode):
    user = User.query.get(user_id)
    user.gender = gender
    user.age = calculate_age(birthdate)
    user.ethnicity = ethnicity
    user.zipcode = zipcode 

# Category_tags
def get_category_by_id(category_tag_id):
    """Return a category tag by primary key."""
    return Category_tag.query.get(category_tag_id)

def get_category_by_name(category_tag_name):
    """Return a category tag by primary key."""
    return Category_tag.query.filter(Category_tag.category_tag_name == category_tag_name).first()


def all_category_tags():
    """Return all category tags."""
    return Category_tag.query.all()



# Groups
def get_group_by_id(group_id):
    """Return a group by primary key."""
    return Group.query.get(group_id)


def get_group_by_name(group_name):
    """Return a group by primary key."""
    return Group.query.filter(Group.group_name == group_name).first()

def all_groups():
    """Return all groups"""
    return Group.query.all()


# UserTag
def get_user_tags(user_id):
    user = User.query.get(user_id)
    return user.category_tags


# GroupTag
def get_group_tags(group_id):
    group = Group.query.get(group_id)
    return group.category_tags

# UserGroup
def get_user_groups(user_id):
    user = User.query.get(user_id)
    return user.groups

def get_users_in_group(group_id):
    db.session.query(User)\
    .join(UserGroup, UserGroup.user_id == User.user_id)\
    .filter(UserGroup.group_id == group_id)\
    .all()


# def groups_with_ppl(group_id):
#     groups=db.session.query(Group.group_name).join(UserGroup, Group.group_id == group_id).group_by(Group.group_id).having(func.count(UserGroup.user_id) > 1).all()
#     return groups






if __name__ == "__main__":
    from server import app

    connect_to_db(app)