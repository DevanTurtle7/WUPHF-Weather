from flask_restful import Resource
from flask import request, jsonify
from db_login import *
from db_create_account import *

class Login(Resource):
    def post(self):
        email = request.json['email']
        password = request.json['password']

        if email and password:
            new_session_key = generate_session_key()
            while session_key_exists(new_session_key):
                new_session_key = generate_session_key()

            update_session_key(email, new_session_key)

            # Send back response with cookie
            return jsonify({'valid': True, 'cookie': new_session_key})

        return jsonify({'valid': False})
