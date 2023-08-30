"""Server for inner-join friendship app."""

import os
from flask import Flask, render_template, request, flash, session, redirect
from model import connect_to_db, db, User, Category_tag, Group, UserTag, UserGroup,GroupTag
import crud
from jinja2 import StrictUndefined
import json

app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY")
app.jinja_env.undefined = StrictUndefined


@app.route('/')
def homepage():
    return render_template("homepage.html")

# @app.route('/<path:sub_path>')
# def route(sub_path):
#     return render_template('homepage.html')


@app.route("/register", methods=["POST"])
def register_user():
    """Create a new user."""

    email = request.form.get("email")
    password = request.form.get("password")

    user = User.get_by_email(email)
    if user:
        flash("Cannot create an account with that email. Try again.")
    else:
        user = User.create(email, password)
        db.session.add(user)
        db.session.commit()
        flash("Account created! Please log in.")

    return redirect("/")


@app.route("/users")
def all_users():
    """View all users."""

    users = User.all_users()
    tags = Category_tag.all_category_tags()
    groups = Group.all_groups()
    user_groups = crud.get_user_groups(user_id=1)
    user_tags = User.category_tags(user_id=1)

    return render_template("all_users.html", users=users, tags=tags, groups=groups,user_groups=user_groups,user_tags=user_tags)


@app.route("/my_groups")
def my_groups():
    """View all users."""

    users = User.all_users()
    print(users)

    tags = Category_tag.all_category_tags()
    tag_names = []
    for tag in tags:
        tag_names.append((tag.category_tag_name,tag.category_tag_id))
    print(tag_names)
   

    groups = Group.all_groups()

    user_groups = crud.get_user_groups(user_id=1)

    with open("data/user_data.json") as f:
        user_data = json.loads(f.read())
        for userd in user_data: 
            username = firstname + lastname 
            #fill out all variables for users 
            user = create(cls, username, email, password, fname, lname, gender, age, ethnicity=None)
            # if user hobby > 0 
            # add user tag 
            


    for user in users:
        for tag in tags:

            user_id = user.user_id
            category_tag_id = tag.category_tag_id
            tag_name = tag.category_tag_name 

            with open("data/user_data.json") as f:
                user_data = json.loads(f.read())

            for userd in user_data:
                if userd["id"] == user_id:
                    match_user = userd
            if match_user and tag_name in match_user and match_user[tag_name]:
                user_tag = UserTag(user_id=user_id, category_tag_id=category_tag_id)
                db.session.add(user_tag)
                db.session.commit()

                print(UserTag.query.all())
                print(UserTag.query.count())









                # for tag in tag_names:
                #     if tag in user and user[tag] != []:
                #         userdb = crud.get_user_by_id(user_id)
                #         print(userdb)
                #         userdb.category_tags.append(tag)





# #########
#     with open("data/user_data.json") as f:
#         user_data = json.loads(f.read())

#     for user in user_data:
#         user_id = user["id"]
#         print(user_id)

#         for tag in tag_names:
#             if tag in user and user[tag] != []:
#                 userdb = crud.get_user_by_id(user_id)
#                 print(userdb)
#                 userdb.category_tags.append(tag)
    
#     print(UserTag.query.all())


    return render_template("all_users.html", users=users, tags=tags, groups=groups,user_groups=user_groups)




























# @app.route("/users/<user_id>")
# def show_user(user_id):
#     """Show details on a particular user."""

#     user = User.get_by_id(user_id)

#     return render_template("user_details.html", user=user)



# @app.route('/register')
# def register():
#     return render_template("register.html")


# @app.route('/<path>')
# def route(path):

#     return render_template('homepage.html')






if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", port=3001, debug=True)