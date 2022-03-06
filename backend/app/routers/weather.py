from fastapi import APIRouter, Depends

from fastapi_utils.tasks import repeat_every

from ..weather.main import get_weather_message
from ..notifier.main import notify

from ..dependencies import authenticate
from ..database.main import db


router = APIRouter()


@router.get('/message')
def weather_message(uuid: str = Depends(authenticate)):
    sql = '''
    SELECT latitude, longitude
    FROM account
    WHERE id = %s;
    '''
    latitude, longitude = db.exec_get_one(sql, uuid)
    if not latitude or not longitude:
        return {'error': 'No location set.'}
    return get_weather_message(latitude, longitude)


@router.get('/notify')
def notify_weather(uuid: str = Depends(authenticate)):
    notify(uuid)


@router.on_event("startup")
@repeat_every(seconds=60)  # 1 minute
def notify_accounts():
    print('NOTIFY ACCOUNTS CHECKING')
    sql = '''
    SELECT id
    FROM account
    WHERE notify_time >= CURRENT_TIME
    AND notify_time =< CURRENT_TIME + '1 min';
    '''
    for account in db.exec_get_all(sql):
        uuid = account[0]
        print('\tNOTIFY ' + uuid)
        notify(uuid)

