from flask_restful import Resource
from flask import request
import requests
from get_message import make_message
from main import *


class Message(Resource):
    def post(self):
        lat = request.json['latitude']
        lon = request.json['longitude']
        url = "http://api.openweathermap.org/data/2.5/weather?lat=%s&lon=%s&appid=%s&units=imperial" % (lat, lon, weather_key)

        response = requests.get(url)
        return make_message(response)


if __name__ == '__main__':
    lat = '43.1566'
    lon = '-77.6088'
    url = "http://api.openweathermap.org/data/2.5/weather?lat=%s&lon=%s&appid=%s&units=imperial" % (lat, lon, weather_key)
    print(make_message(requests.get(url)))
