import secrets
from hashlib import sha512
import psycopg2
from main import *

conn = psycopg2.connect(db_conn)


def generate_salt():
    """
    Internal method to generate a salt for a new user in the database
    128 chars for increased security
    """
    return secrets.token_hex(64)


def hash_password_with_salt(salt, password):
    combined_str = salt + password
    return sha512(combined_str.encode("utf-8")).hexdigest()


def generate_session_key():
    """
    Generates a 32 character url safe token
    for use as a browser session key
    """
    return secrets.token_urlsafe(24)


def session_key_exists(session):
    sql = """
    SELECT 1
    FROM account
    WHERE session = %s;
    """
    with conn.cursor() as curs:
        return curs.execute(sql.format(session))


def update_session_key(email, new_session):
    sql = """
    UPDATE account
    SET expire = NOW() + interval '1 day',
    session = %s
    WHERE email = %s;
    """
    with conn.cursor() as curs:
        curs.execute(sql.format(email, new_session))


def authenticate_session(session):
    sql = """
    SELECT user_id
    FROM account
    WHERE session = %s AND
    expire > NOW();
    """
    with conn.cursor() as curs:
        curs.execute(sql.format(session))


def logout(session):
    sql = """
    UPDATE account
    SET expire = NOW()
    WHERE session = %s;
    """
    with conn.cursor() as curs:
        curs.execute(sql.format(session_key))


def create_account(email, phone, password, lat, lon, time):
    sql = """
    INSERT INTO account
    (email, phone, password, latitude, longitude, notify_time)
    VALUES (%s, %s, %s, %s, %s)
    """

    salt = generate_salt()
    params = [email, phone, hash_password_with_salt(salt, password), lat, lon, time]
    with conn.cursor() as curs:
        curs.execute(sql, params)
