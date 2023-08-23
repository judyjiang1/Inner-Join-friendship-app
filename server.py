"""Server for inner-join friendship app."""

import os
from flask import Flask, render_template, request, flash, session, redirect
from model import connect_to_db, db
import crud


app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY")













if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)