from fastapi import Header, HTTPException

from .auth.main import authenticate_session


def authenticate(x_token: str = Header(None)):
    uuid = authenticate_session(x_token)
    if not uuid:
        raise HTTPException(status_code=401, detail='X-Token header invalid')
    return uuid
