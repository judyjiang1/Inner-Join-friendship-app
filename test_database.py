import os
from unittest import TestCase
from server import app
from model import(db, User)


os.system("dropdb testdb-innerjoin")
os.system("createdb testdb-innerjoin")

class TestPsqlDatabase(TestCase):
    def setUp(self):
        app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///testdb-innerjoin"
        app.config["SQLALCHEMY_ECHO"] = False
        app.config["TESTING"] = True
        self.app = app.test_client()
        print("Connected to the testing db!")

        with app.app_context():
            db.create_all()
            print("Created test db")

    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()
            print("Removed test db")
    
    def test_add_user(self):
        new_user = User.create(username='test_db_user', email='testdb@test.com', password='testdb123',fname='testdb', lname='testdb')
        db.session.add(new_user)
        db.session.commit()

        user = User.query.filter_by(username='test_db_user').first()
        self.assertIsNotNone(user)
        self.assertEqual(user.username, 'test_db_user')

if __name__ == "__main__":
    import unittest
    unittest.main()