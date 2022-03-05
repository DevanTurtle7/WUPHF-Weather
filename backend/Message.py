from flask_restful import Resource
from flask import request
import requests
from get_message import make_message

key = '0d95e14a5b884b1441e2341498d9b676'


class Message(Resource):
    def post(self):
        lat = request.json['latitude']
        lon = request.json['longitude']
        url = "api.openweathermap.org/data/2.5/onecall?lat=%s&lon=%s&appid=%s&units=imperial" % (lat, lon, key)

        response = requests.get(url)
        return make_message(response)
