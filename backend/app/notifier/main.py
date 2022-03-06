from ..database.main import db
from ..twilio.mail import send_email
from ..twilio.sms import send_sms
from ..weather.main import get_weather_message


def notify(uuid):
    sql = '''
    SELECT email, email_verified, phone, phone_verified, latitude, longitude
    FROM account
    WHERE id = %s;
    '''
    result = db.exec_get_one_json(sql, uuid)

    if not result['latitude'] or not result['longitude']:
        return

    weather_message = get_weather_message(result['latitude'], result['longitude'])

    if result['email_verified']:
        send_email(
            result['email'],
            'Your Weather Report',
            weather_message
        )

    if result['phone_verified']:
        send_sms(
            result['phone'],
            weather_message
        )

