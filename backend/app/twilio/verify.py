import os
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException

account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
verify_sid = os.environ['TWILIO_VERIFY_SERVICE_ID']
client = Client(account_sid, auth_token)


def send_verification_sms(number):
    try:
        client.verify \
            .services(verify_sid) \
            .verifications \
            .create(to=number, channel='sms')
        return True
    except TwilioRestException:
        return False


def check_sms_code(number, code):
    try:
        verification_check = client.verify \
            .services(verify_sid) \
            .verification_checks \
            .create(to=number, code=code)
        return verification_check.status
    except TwilioRestException:
        return

