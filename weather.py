from flask_restful import Resource, Api
from flask import request
import requests
import json
from get_message import make_message

class Weather(Resource):
    def post(self):
        lat = request.json['latitude']
        lon = request.json['longitude']
        key = request.json['key']
        url = "pro.openweathermap.org/data/2.5/onecall?lat=%s&lon=%s&appid=%s&units=imperial" % (lat, lon, key)

        response = requests.get(url)
        data = json.loads(response.text)
        return make_message(response)

