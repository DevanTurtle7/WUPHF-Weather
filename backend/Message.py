from flask_restful import Resource
from flask import request
import requests
from get_message import make_message


class Message(Resource):
    def post(self):
        lat = request.json['latitude']
        lon = request.json['longitude']
        key = request.json['key']
        url = "pro.openweathermap.org/data/2.5/onecall?lat=%s&lon=%s&appid=%s&units=imperial" % (lat, lon, key)

        response = requests.get(url)
        return make_message(response)

