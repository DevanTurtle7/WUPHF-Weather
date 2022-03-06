from flask_restful import Resource
from flask import request, jsonify
from db_authentication import *
import re


class CreateAccount(Resource):
    def post(self):
        email = request.json['emailAddress']
        password = request.json['password']
        phone_num = request.json['telephoneNumber']
        lat = request.json['latitude']
        lon = request.json['longitude']
        time = request.json['notifyTime']
        # verify
        if email and password and re.search('^\d{10}$', phone_num) and lat and lon:
            # Create account
            create_account(email, phone_num, password, lat, lon, time)

            new_session_key = generate_session_key()
            while session_key_exists(new_session_key):
                new_session_key = generate_session_key()

            update_session_key(email, new_session_key)

            return jsonify({'valid': True, 'cookie': new_session_key})

        return {'valid': False}
