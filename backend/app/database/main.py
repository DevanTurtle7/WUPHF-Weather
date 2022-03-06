import psycopg2
import os

from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

# load env to get creds
load_dotenv()


def parse_args(args):
    # If arg is a single string save the time on the user
    #   making it a 1 item tuple and convert it for them.
    if type(args) != tuple and type(args) != list:
        args = (args,)
    return args


class Database:
    def __init__(self):
        self.conn = psycopg2.connect(os.environ['COCKROACH_DB'])
        self.conn.autocommit = True

    def __del__(self):
        self.conn.close()

    def exec_get_one(self, sql, args=None):
        args = parse_args(args)
        cur = self.conn.cursor()
        cur.execute(sql, args)
        return cur.fetchone()

    def exec_get_one_json(self, sql, args=None):
        args = parse_args(args)
        cur = self.conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(sql, args)
        return cur.fetchone()

    def exec_get_all(self, sql, args=None):
        args = parse_args(args)
        cur = self.conn.cursor()
        cur.execute(sql, args)
        return cur.fetchall()

    def exec_get_all_json(self, sql, args=None):
        args = parse_args(args)
        cur = self.conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(sql, args)
        return cur.fetchall()

    def exec_commit(self, sql, args=None):
        args = parse_args(args)
        cur = self.conn.cursor()
        result = cur.execute(sql, args)
        self.conn.commit()
        return result

    def exec_commit_r(self, sql, args=None):
        args = parse_args(args)
        cur = self.conn.cursor()
        cur.execute(sql, args)
        result = cur.fetchall()
        self.conn.commit()
        return result

    def exec_commit_many(self, sql, args=[]):
        cur = self.conn.cursor()
        result = cur.executemany(sql, args)
        self.conn.commit()
        return result


db = Database()
