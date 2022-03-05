from flask_restful import Resource
from flask import request, jsonify
from db_create_account import *

class CreateAccount(Resource):
    def post(self):
        email = request.json['email']
        password = request.json['password']
        phone_num = request.json['phone_number']
        lat = request.json['latitude']
        lon = request.json['longitude']
        # verify
        if email and password and phone_num and lat and lon:
            # Create account
            create_account(email, password, phone_num, lat, lon)

            new_session_key = generate_session_key()
            while session_key_exists(new_session_key):
                new_session_key = generate_session_key()

            update_session_key(email, new_session_key)

            return jsonify({'valid': True, 'cookie': new_session_key})

        return{'valid': False}