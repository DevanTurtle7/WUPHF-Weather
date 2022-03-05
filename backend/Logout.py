from flask_restful import Resource
from flask import request, jsonify
from db_authentication import *


class Logout(Resource):
    def get(self):
        session_key = request.json['session_key']
        if session_key and session_key_exists(session_key):
            user_id = authenticate_session(session_key)
            logout(session_key)

            return jsonify({'logout': True})

        return {'logout': False}
