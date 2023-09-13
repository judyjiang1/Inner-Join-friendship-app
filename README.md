# Create a virtual environment

virtualenv env
source env/bin/activate

# Install requirements

pip3 install -r requirements.txt

# source secrets

source secrets.sh

# Seed database

python3 seed_database.py

# Run server

python3 server.py
