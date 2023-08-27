"""Script to seed database."""

import os
import json

import crud
import model
import server

os.system("dropdb ratings")
os.system("createdb ratings")

model.connect_to_db(server.app)
model.db.create_all()




# Load user data from JSON file 

# Create groups with user data 
# 
#  