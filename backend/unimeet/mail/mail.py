# -*- coding: utf-8 -*-

import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from config import UNIMEET_MAIL, PASSWORD
import json
import dns.resolver
import socket
import re

with open(os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))), 'config', 'services.json'), 'r') as f:
    service_data = json.load(f)


template_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'templates')
SUBJECTS = {
    'welcome': ['Welcome to Unimeet', os.path.join(template_dir, 'welcome.txt')],
    'forgot_password': ['Unimeet Password Reset', os.path.join(template_dir, 'forgot_password.txt')],
    'contact_response': ['[Unimeet] Contact form', os.path.join(template_dir, 'contact_response.txt')]
}


def send_mail(**kwargs):
    user_mail = kwargs['user_mail']
    password = kwargs['password']

    subject = kwargs['subject']
    if subject not in SUBJECTS:
        print 'Invalid subject parameter'
        return

    try:
        welcome_link = service_data['backend']['url'] + '/login?token=' + kwargs['welcome_token']
    except KeyError:
        welcome_link = ''

    with open(SUBJECTS[subject][1], 'r') as f:
        body = f.read().format(user_mail, password, welcome_link)

    email = MIMEMultipart('alternative')
    email['From'] = UNIMEET_MAIL
    email['To'] = user_mail
    email['Subject'] = SUBJECTS[kwargs['subject']][0]
    email.attach(MIMEText(body, 'plain', 'utf-8'))

    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com')
        server.ehlo()
        server.login(UNIMEET_MAIL, PASSWORD)
        server.sendmail(email['From'], email['To'], email.as_string())
        server.close()
    except Exception, e:
        print e


def send_contact_form(name, email_address, message):
    email = MIMEMultipart('alternative')
    email['From'] = UNIMEET_MAIL
    email['To'] = UNIMEET_MAIL
    email['Subject'] = '[Contact form]'
    email.attach(MIMEText(
        'Name: {}\nEmail: {}\nMessage: {}'.format(name, email_address, message.encode('utf-8')),
        'plain',
        'utf-8'
    ))

    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com')
        server.ehlo()
        server.login(UNIMEET_MAIL, PASSWORD)
        server.sendmail(email['From'], email['To'], email.as_string())
        server.close()
    except Exception, e:
        print e


def send_contact_response(email_address):
    with open(SUBJECTS['contact_response'][1], 'r') as f:
        body = f.read()

    email = MIMEMultipart('alternative')
    email['From'] = UNIMEET_MAIL
    email['To'] = email_address
    email['Subject'] = SUBJECTS['contact_response'][0]
    email.attach(MIMEText(body, 'plain', 'utf-8'))

    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com')
        server.ehlo()
        server.login(UNIMEET_MAIL, PASSWORD)
        server.sendmail(email['From'], email['To'], email.as_string())
        server.close()
    except Exception, e:
        print e


def verify_email_address(addressToVerify):
    match = re.match('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$', addressToVerify)

    if match is None:
        print('Bad Syntax')
        raise ValueError('Bad Syntax')

    records = dns.resolver.query('emailhippo.com', 'MX')
    mxRecord = records[0].exchange
    mxRecord = str(mxRecord)

    host = socket.gethostname()  # Get local server hostname
    server = smtplib.SMTP()  # SMTP lib setup

    # SMTP Conversation
    server.connect(mxRecord)
    server.helo(host)
    server.mail('info.unimeet@gmail.com')
    code, message = server.rcpt(str(addressToVerify))
    server.quit()

    # Assume 250 as Success
    if code != 250:
        raise ValueError('Bad Address')
