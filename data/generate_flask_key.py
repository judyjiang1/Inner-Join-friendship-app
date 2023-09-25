import os

def generate_secret_key(length=24):
    return os.urandom(length).hex()


print("Generated secret key:", generate_secret_key())