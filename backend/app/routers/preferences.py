from fastapi import APIRouter, Depends
from pydantic import BaseModel
import datetime

from ..dependencies import authenticate
from ..database.main import db


class Time(BaseModel):
    time: datetime.time


router = APIRouter()


@router.post('/set/time')
def set_time(time: Time, uuid: str = Depends(authenticate)):
    sql = '''
    UPDATE account
    SET notify_time = %s
    WHERE id = %s;
    '''
    db.exec_commit(sql, (time.time, uuid))


@router.get('/get/time')
def get_time(uuid: str = Depends(authenticate)):
    sql = '''
    SELECT notify_time
    FROM account
    WHERE id = %s;
    '''
    return db.exec_get_one_json(sql, uuid)
