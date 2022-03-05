import secrets
from hashlib import sha512
from psycopg2.extras import execute_values
from database import db


def create_account(email, password, phone_num, lat, lon):
    sql = """
    INSERT INTO user
    (email, password, phone_num, lat, lon)
    VALUES (%s, %s, %s, %s, %s)
    RETURNING id
    """

    salt = generate_salt()
    params = [email, password, phone_num, lat, lon]
    return db.exec_commit_r(sql, params)[0][0]


def generate_salt():
    """
    Internal method to generate a salt for a new user in the database
    128 chars for increased security
    """
    return secrets.token_hex(64)


def generate_session_key():
    """
    Generates a 32 character url safe token
    for use as a browser session key
    """
    return secrets.token_urlsafe(24)


def session_key_exists(session_key):
    sql = """
    SELECT 1
    FROM user
    WHERE session_key = %s;
    """
    return bool(db.exec_get_one(sql, session_key))


def update_session_key(email, new_session_key):
    sql = """
    UPDATE users
    SET key_expire = NOW() + interval '1 day',
    session_key = %s
    WHERE email = %s;
    """
    return db.exec_commit(sql, (new_session_key, email))
