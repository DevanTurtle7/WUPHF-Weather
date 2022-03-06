import os
from twilio.rest import Client

account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
from_number = os.environ['TWILIO_PHONE_NUMBER']
client = Client(account_sid, auth_token)


def send_sms(to, message):
    sent_message = client.messages.create(
        body=message,
        from_=from_number,
        to='+1' + to
    )

    return sent_message.status
