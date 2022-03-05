import secrets
from hashlib import sha512
import psycopg2
import os

opt = """postgresql://nick:ILsTMfzhA2rcGoGxzY-CtQ@free-tier11.gcp-us-east1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dwuphf-weather-214"""
conn = psycopg2.connect(os.environ[opt])


def create_account(email, password, phone_num, lat, lon):
    sql = """
    INSERT INTO user
    (email, password, phone_num, lat, lon)
    VALUES (%s, %s, %s, %s, %s)
    """

    salt = generate_salt()
    params = [email, hash_password_with_salt(salt, password), phone_num, lat, lon]
    with conn.cursor() as curs:
        curs.execute(sql.format(params))


if __name__ == '__main__':
    create_account("rejhgvb", "erkbg", "9788864834", "34.34566", "56.45387")


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


def session_key_exists(session_key):
    sql = """
    SELECT 1
    FROM user
    WHERE session_key = %s;
    """
    with conn.cursor() as curs:
        return curs.execute(sql.format(session_key))


def update_session_key(email, new_session_key):
    sql = """
    UPDATE user
    SET key_expire = NOW() + interval '1 day',
    session_key = %s
    WHERE email = %s;
    """
    with conn.cursor() as curs:
        curs.execute(sql.format(email, new_session_key))


def authenticate_session(session_key):
    sql = """
    SELECT user_id
    FROM user
    WHERE session_key = %s AND
    key_expire > NOW();
    """
    with conn.cursor() as curs:
        curs.execute(sql.format(session_key))


def logout(session_key):
    sql = """
    UPDATE user
    SET key_expire = NOW()
    WHERE session_key = %s;
    """
    with conn.cursor() as curs:
        curs.execute(sql.format(session_key))
