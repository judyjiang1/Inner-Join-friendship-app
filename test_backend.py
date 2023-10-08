from unittest import TestCase
from server import app
import json



class TestMyApp(TestCase):
    """Testing successful login and failed login."""

    def setUp(self):
        app.testing = True
        self.app = app.test_client()

    def test_successful_login(self):
        data = {'email': 'testuser@test.com', 'password': 'testtesttest'}
        response = self.app.post('/api/login', json=data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data), {
            "email": "testuser@test.com",
            "fname": "Test",
            "lname": "User",
            'success': True,
            "user_id": 201,
            "username": "testuser"
        })

    def test_failed_login(self):
        data = {'email': 'asdfs@dgfgfr.com', 'password': 'adfdgfdsdaf'}
        response = self.app.post('/api/login', json=data)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(json.loads(response.data), {'success': False, 'message': 'invalid user'})


if __name__ == "__main__":
    import unittest
    unittest.main()