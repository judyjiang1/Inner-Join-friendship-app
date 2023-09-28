import os
from unittest import TestCase
from server import app
from model import(db, User)



class TestDatabase(TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db_test.db'
        self.app = app.test_client()
        with app.app_context():
            db.create_all()

    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()
            db_file = "db_test.db"
            if os.path.exists(db_file):
                os.remove(db_file)
                print(f'Deleted {db_file}.')
            else:
                print(f'{db_file} does not exist.')
            
            
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