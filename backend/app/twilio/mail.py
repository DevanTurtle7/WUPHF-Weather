import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

sg = SendGridAPIClient(os.environ['SENDGRID_API_KEY'])
from_email = f'Wuphf Weather <{os.environ["SENDGRID_FROM_EMAIL"]}>'


def send_verification_email(to, token):
    # send_email(
    #     to,
    #     'Verify Your Email',
    #     f'''
    #     <h1>Wuphf Weather</h1>
    #     <p>Please verify your email by clicking the link below.</p>
    #     <h2><a href="http://56stewart.tplinkdns.com/auth/email/askverify/{token}">Verify Email</a></h2>
    #     '''
    # )
    print('Email Verification: ', to, f'http://56stewart.tplinkdns.com/auth/email/askverify/{token}')


def send_email(to, subject, html_content):
    message = Mail(
        from_email=from_email,
        to_emails=to,
        subject=subject,
        html_content=html_content
    )
    sg.send(message)
