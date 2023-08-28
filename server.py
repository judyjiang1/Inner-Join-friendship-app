"""Server for inner-join friendship app."""

import os
from flask import Flask, render_template, request, flash, session, redirect
from model import connect_to_db, db
import crud


app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY")


@app.route('/')
def homepage():
    return render_template("homepage.html")

# @app.route('/<path:sub_path>')
# def route(sub_path):
#     return render_template('homepage.html')

# @app.route('/login')
# def login():
#     return render_template("login.html")


# @app.route('/register')
# def register():
#     return render_template("register.html")


# @app.route('/<path>')
# def route(path):

#     return render_template('homepage.html')






if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", port=3001, debug=True)