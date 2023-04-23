import re
from flask_app.config.mysqlconnection import connectToMySQL
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
        self.hearts_sent = []
        self.hearts_received = []
        


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
        query = 'INSERT INTO users(first_name, last_name, email, password, created_at, updated_at) VALUES ( %(first_name)s, %(last_name)s, %(email)s, %(password)s , NOW(), NOW() );'
        return connectToMySQL('lovebirds_schema').query_db(query, data)

    @classmethod
    def get_info_by_id(cls, data):
        query = 'SELECT * FROM users WHERE id=%(user_id)s;'
        results = connectToMySQL('lovebirds_schema').query_db(query, data)
        return cls(results[0])
    
    @classmethod
    def update_user(cls, data):
        query = 'UPDATE users SET first_name=%(first_name)s, last_name=%(last_name)s, email=%(email)s WHERE id = %(id)s;'
        return connectToMySQL('lovebirds_schema').query_db(query, data)
    
    @classmethod
    def validate_password(cls, data):
        is_valid = True
        if len(data['password']) < 5:
            flash('Password must be at least 5 characters', 'update_pw')
            is_valid = False
        if data['password'] != data['confirm_password']:
            flash('Password confirmation not matching! Try again.', 'update_pw')
            is_valid = False
        return is_valid


    @classmethod
    def update_password(cls, data):
        query = 'UPDATE users SET password=%(password)s WHERE id = %(id)s;'
        return connectToMySQL('lovebirds_schema').query_db(query, data)
    
    @classmethod
    def delete_user(cls, data):
        query = 'DELETE FROM users WHERE id=%(id)s;'
        return connectToMySQL('lovebirds_schema').query_db(query, data)
    
    @classmethod
    def get_all_users(cls):
        query = 'SELECT * FROM users;'
        return connectToMySQL('lovebirds_schema').query_db(query)

    @classmethod
    def send_heart(cls, data):
        query = 'SELECT * FROM matches WHERE user_id = %(user_id)s AND match_id = %(match_id)s;'
        results = connectToMySQL('lovebirds_schema').query_db(query, data)
        if results:
            flash('You already sent this user a heart, be patient! :)', 'heart')
            return False

        query = 'INSERT INTO matches(user_id, match_id) VALUES (%(user_id)s, %(match_id)s);'
        return connectToMySQL('lovebirds_schema').query_db(query, data)
    
    @classmethod
    def unsend_heart(cls, data):
        query = 'DELETE FROM matches WHERE user_id = %(user_id)s AND match_id = %(id)s;'
        return connectToMySQL('lovebirds_schema').query_db(query, data)

    @classmethod
    def get_me_with_all_my_hearts(cls, data):

        # this gets us all the users that we have sent hearts out to and add it to the hearts_sent array above
        query = 'SELECT u.*, m.* FROM users u LEFT JOIN matches ON matches.user_id = u.id LEFT JOIN users m ON matches.match_id = m.id WHERE u.id = %(id)s;'
        results = connectToMySQL('lovebirds_schema').query_db(query, data)
        user = cls(results[0])
        for row in results:
            user_data = {
                'id': row['m.id'],
                'first_name': row['m.first_name'],
                'last_name': row['m.last_name'],
                'email': row['m.email'],
                'password': row['m.password'],
                'created_at': row['m.created_at'],
                'updated_at': row['m.updated_at']
            }
            user.hearts_sent.append(cls(user_data))

        # this gets us all the users that have sent us hearts and add it to the hearts_received array above
        query = 'SELECT u.* , m.* FROM users u LEFT JOIN matches ON matches.match_id = u.id LEFT JOIN users m ON matches.user_id = m.id WHERE u.id = %(id)s;'
        results = connectToMySQL('lovebirds_schema').query_db(query, data)
        for row in results:
            user_data = {
                'id': row['m.id'],
                'first_name': row['m.first_name'],
                'last_name': row['m.last_name'],
                'email': row['m.email'],
                'password': row['m.password'],
                'created_at': row['m.created_at'],
                'updated_at': row['m.updated_at']
            }
            user.hearts_received.append(cls(user_data))

        return user
    
    @classmethod
    def check_if_we_match(cls, data):
        user1 = cls.get_me_with_all_my_hearts(data)
        for sent in user1.hearts_sent:
            for received in user1.hearts_received:
                if sent.id == received.id:
                    print("Congrats! It's a match!")
                    return True
        return False
    

