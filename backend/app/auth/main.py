import psycopg2.errors
from argon2 import PasswordHasher

from ..database.main import db

ph = PasswordHasher()


def update_session_key(uuid):
    sql = '''
    UPDATE account
    SET expire = NOW() + interval '1 week',
    session = gen_random_uuid()
    WHERE id = %s
    RETURNING session;
    '''
    new_session_key = db.exec_commit_r(sql, uuid)

    return new_session_key[0][0]


def authenticate_session(session):
    sql = '''
    SELECT id
    FROM account
    WHERE session = %s
    AND expire > NOW();
    '''
    try:
        uuid = db.exec_get_one(sql, session)
    except psycopg2.errors.InvalidTextRepresentation:
        return None
    return uuid


def end_session(uuid):
    sql = '''
    UPDATE account
    SET expire = NOW()
    WHERE id = %s;
    '''
    db.exec_commit(sql, uuid)