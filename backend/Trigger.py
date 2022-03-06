from datetime import datetime
from time import sleep
import psycopg2
from Message import *

conn = psycopg2.connect(db_conn)


async def schedule():
    print('schedule running')
    while datetime.now().minute not in {0, 15, 30, 45}:
        # Wait 1 second until we are synced up with the 'every 15 minutes' clock
        sleep(1)

    def trigger():
        sql = """
        SELECT *
        FROM account
        WHERE notify_time IS %s
        """

        with conn.cursor() as curs:
            response = curs.execute(sql.format(datetime.now())).json

        for account in response:
            print(Message.post(account))

    trigger()

    while True:
        sleep(60 * 15)  # Wait for 15 minutes
        trigger()
