import argon2.exceptions
import psycopg2.errors
from fastapi import APIRouter, HTTPException, Depends, Response
from fastapi.responses import HTMLResponse
from pydantic import BaseModel, EmailStr, constr

from ..database.main import db
from ..twilio.mail import send_verification_email
from ..twilio.verify import send_verification_sms, check_sms_code
from ..dependencies import authenticate
from ..auth.main import ph, update_session_key, end_session


class SignUp(BaseModel):
    email: EmailStr
    phone: constr(regex=r'^\d{10}$')  # must be in 1234567890 format
    password: str


class Login(BaseModel):
    email: EmailStr
    password: str


router = APIRouter()


@router.post('/signup')
def signup(info: SignUp):
    # Hash password
    password_hash = ph.hash(info.password)

    # Put entry into database
    sql = '''
    INSERT INTO account (email, phone, password)
    VALUES (%s, %s, %s)
    RETURNING id, email_token;
    '''
    args = (info.email.lower(), info.phone, password_hash)

    try:
        account_uuid, email_token = db.exec_commit_r(sql, args)[0]
    except psycopg2.errors.UniqueViolation as e:
        return {'error': 'Phone Number or Email has been used already.'}

    send_verification_email(info.email, email_token)
    sms_sent = send_verification_sms('+1' + info.phone)

    session_key = update_session_key(account_uuid)

    return {'session': session_key, 'sms_sent': sms_sent}


@router.post('/login')
def login(info: Login):
    # Get password hash
    sql = '''
    SELECT id, password
    FROM account
    WHERE email = %s;
    '''
    try:
        uuid, password_hash = db.exec_get_one(sql, info.email.lower())
    except TypeError:
        raise HTTPException(status_code=401, detail='Email does not exist.')

    # Verify password
    try:
        ph.verify(password_hash, info.password)
    except argon2.exceptions.VerifyMismatchError:
        raise HTTPException(status_code=401, detail='Incorrect password.')

    # Update session key
    session_key = update_session_key(uuid)

    return {'session': session_key}


@router.post('/logout')
def logout(uuid: str = Depends(authenticate)):
    end_session(uuid)


@router.get('/email/verify/{code}')
def verify_email(code: str):
    sql = '''
    UPDATE account
    SET email_verified = TRUE,
    email_token = NULL
    WHERE email_token = %s
    RETURNING email_verified;
    '''
    try:
        if not db.exec_commit_r(sql, code):
            return Response('<h1>Invalid Code</h1>', 401)
        else:
            return Response('<h1>Email Verified!</h1>')
    except psycopg2.errors.InvalidTextRepresentation:
        return Response('<h1>Invalid Code</h1>', 401)


@router.get('/email/askverify/{code}')
def verify_email(code: str):
    return HTMLResponse(f'''
    <h1>
        <a href="http://56stewart.tplinkdns.com/auth/email/verify/{code}">
            Click to verify your email
        </a>
    </h1>
    ''')


@router.get('/email/verified')
def is_email_verified(uuid: str = Depends(authenticate)):
    sql = '''
    SELECT email_verified
    FROM account
    WHERE id = %s;
    '''
    return db.exec_get_one_json(sql, uuid)


@router.post('/sms/verify/{code}')
def verify_sms(code: str, uuid: str = Depends(authenticate)):
    # Get phone number from db
    sql = '''
    SELECT phone
    FROM account
    WHERE id = %s;
    '''
    phone = db.exec_get_one(sql, uuid)[0]

    verified = check_sms_code('+1' + phone, code)
    if verified == 'approved':
        sql = '''
        UPDATE account
        SET phone_verified = TRUE
        WHERE id = %s;
        '''
        db.exec_commit(sql, uuid)
        return {'phone_verified': True}
    elif verified is None:
        return Response(status_code=400)
    return {'phone_verified': False}


@router.get('/sms/verified')
def is_sms_verified(uuid: str = Depends(authenticate)):
    sql = '''
    SELECT phone_verified
    FROM account
    WHERE id = %s;
    '''
    return db.exec_get_one_json(sql, uuid)


