import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from config import UNIMEET_MAIL, PASSWORD


template_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'templates')
SUBJECTS = {
    'welcome': ['Welcome to Unimeet', os.path.join(template_dir, 'welcome.html')],
    'forgot_password': ['Unimeet Password Reset', os.path.join(template_dir, 'forgot_password.html')]
}


def send_mail(user_mail, password, subject):
    if subject not in SUBJECTS:
        print 'Invalid subject parameter'
        return

    with open(SUBJECTS[subject][1], 'r') as f:
        body = f.read().format(user_mail, password)

    email = MIMEMultipart('alternative')
    email['From'] = UNIMEET_MAIL
    email['To'] = user_mail
    email['Subject'] = SUBJECTS[subject][0]
    email.attach(MIMEText(body, 'html'))

    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com')
        server.ehlo()
        server.login(UNIMEET_MAIL, PASSWORD)
        server.sendmail(email['From'], email['To'], email.as_string())
        server.close()
    except Exception, e:
        print e
