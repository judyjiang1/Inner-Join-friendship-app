"""CRUD operations."""

from model import db, User, Category_tag, Group, UserGroup, UserTag, connect_to_db
import json


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

def store_temp_user_info():
    pass

# # Load user data from JSON file 
# with open("data/user_data.json") as f:
#     user_data = json.loads(f.read())


# def get_user_by_college():
#     """Return all users with the same college."""
#     return User.query.filter



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
def get_by_id(group_id):
    """Return a group by primary key."""
    return Group.query.get(group_id)


# def get_group_id_by_name(group_name):
#     return Group.query.get(group_name)


def all_category_tags():
    """Return all category tags"""
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


# users=User.all_users()
# print(users)


def save_user_tags():
    pass





if __name__ == "__main__":
    from server import app

    connect_to_db(app)