from flask import Flask
from flask_restful import Resource, Api
from Message import *
from CreateAccount import *
from Login import *
from Logout import *
from Trigger import *
import asyncio

app = Flask(__name__)
api = Api(app)


class Test(Resource):
    def get(self):
        return 'Connection Successful.'


api.add_resource(Test, '/')

# account management
api.add_resource(CreateAccount, '/createAccount')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')

# messaging bodies
api.add_resource(Message, '/message')


# run server and schedule async (below is not working)
async def main():
    task1 = asyncio.create_task(app.run(debug=True))
    task2 = asyncio.create_task(schedule())

    await task1
    await task2

if __name__ == '__main__':
    asyncio.run(main())

