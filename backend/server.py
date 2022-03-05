from flask import Flask
from flask_restful import Resource, Api
from Message import *

app = Flask(__name__)
api = Api(app)


class Test(Resource):
    def get(self):
        return 'Connection Successful.'


api.add_resource(Test, '/')

api.add_resource(Message, '/message')

if __name__ == '__main__':
    app.run(debug=True)