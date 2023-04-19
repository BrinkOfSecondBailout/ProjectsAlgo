import re
from flask_app.config.mysqlconnection import connectToMySQL
from flask_app.controllers import users
from flask_bcrypt import Bcrypt
from flask_app import app
from flask import flash
bcrypt = Bcrypt(app)
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')


class User:
    def __init__(self, data):
        self.id = data['id']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.password = data['password']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        
    def fullName(self):
        return f'{self.first_name} {self.last_name}'

    @staticmethod
    def validate_registration(data):
        is_valid = True
        query = 'SELECT * FROM users WHERE email=%(email)s;'
        results = connectToMySQL('lovebirds_schema').query_db(query, data)
        if len(results) > 0:
            flash('This email account already exists! Please log in.', 'registration')
            is_valid = False
        if len(data['first_name']) < 2:
            flash('First name must be at least 2 characters!', 'registration')
            is_valid = False
        if len(data['last_name']) < 2:
            flash('Last name must be at least 2 characters!', 'registration')
            is_valid = False
        if not EMAIL_REGEX.match(data['email']):
            flash('Invalid email format', 'registration')
            is_valid = False
        if len(data['password']) < 5:
            flash('Password must be at least 5 characters', 'registration')
            is_valid = False
        if data['password'] != data['confirm_password']:
            flash('Password confirmation not matching! Try again.', 'registration')
            is_valid = False
        return is_valid
    
    @staticmethod
    def validate_edit(data):
        is_valid = True
        query = 'SELECT * FROM users WHERE id=%(id)s;'
        results = connectToMySQL('lovebirds_schema').query_db(query, data)
        if len(data['first_name']) < 2:
            flash('First name must be at least 2 characters!', 'edit')
            is_valid = False
        if len(data['last_name']) < 2:
            flash('Last name must be at least 2 characters!', 'edit')
            is_valid = False
        if not EMAIL_REGEX.match(data['email']):
            flash('Invalid email format', 'edit')
            is_valid = False
        return is_valid

    @staticmethod
    def validate_login(data):
        is_valid = True
        query = 'SELECT * FROM users WHERE email=%(email)s;'
        results = connectToMySQL('lovebirds_schema').query_db(query, data)
        if len(results) == 0:
            flash('That email is not found in the database! Try again.', 'login')
            is_valid = False
            return is_valid
        else:
            is_valid = True
            user_data = results[0]
            return user_data

    @classmethod
    def save_user(cls, data):
        query = 'INSERT INTO users(first_name, last_name, email, password) VALUES ( %(first_name)s, %(last_name)s, %(email)s, %(password)s );'
        return connectToMySQL('lovebirds_schema').query_db(query, data)

    @classmethod
    def get_info_by_id(cls, data):
        query = 'SELECT * FROM users WHERE id=%(id)s;'
        results = connectToMySQL('lovebirds_schema').query_db(query, data)
        return cls(results[0])
    
    @classmethod
    def update_user(cls, data):
        query = 'UPDATE users SET first_name=%(first_name)s, last_name=%(last_name)s, email=%(email)s WHERE id = %(id)s;'
        return connectToMySQL('lovebirds_schema').query_db(query, data)
    
    @classmethod
    def delete_user(cls, data):
        query = 'DELETE FROM users WHERE id=%(id)s;'
        return connectToMySQL('lovebirds_schema').query_db(query, data)
    
    @classmethod
    def get_all_users(cls):
        query = 'SELECT * FROM users;'
        return connectToMySQL('lovebirds_schema').query_db(query)


