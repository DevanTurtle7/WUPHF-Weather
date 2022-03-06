from fastapi import APIRouter, Depends
from pydantic import BaseModel

from ..dependencies import authenticate
from ..database.main import db


class Location(BaseModel):
    latitude: float
    longitude: float


router = APIRouter()


@router.post('/set/location')
def set_location(location: Location, uuid: str = Depends(authenticate)):
    sql = '''
    UPDATE account
    SET latitude = %s,
    longitude = %s
    WHERE id = %s;
    '''
    db.exec_commit(sql, (location.latitude, location.longitude, uuid))


@router.get('/get/location')
def get_location(uuid: str = Depends(authenticate)):
    sql = '''
    SELECT latitude, longitude
    FROM account
    WHERE id = %s;
    '''
    return db.exec_get_one_json(sql, uuid)
