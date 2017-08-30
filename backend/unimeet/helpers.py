from .models import School, User
import re
import string
import random
from mail import send_mail, send_contact_form, send_contact_response


def get_school_list():
    schools = School.objects.all()
    school_list = []
    for s in schools:
        school = {}
        school['id'] = s.id
        school['name'] = s.name
        school['site'] = s.site
        school['university'] = s.university.name
        school['city'] = s.university.city.name
        school['country'] = s.university.city.country.name
        school_list.append(school)
    return school_list


def get_school_by_email(email):
    for school in School.objects.all():
        if re.match(school.mailRegex, email):
            return school
    return None


def create_user(email, school):
    password = User.objects.make_random_password()
    token = ''.join(random.SystemRandom().choice(string.ascii_lowercase + string.digits) for _ in range(40))
    welcome_token = ''.join(random.SystemRandom().choice(string.ascii_lowercase + string.ascii_uppercase + string.digits) for _ in range(60))
    user_obj = User.objects.create_user(email=email, school=school, password=password, token=token, welcomeToken=welcome_token)
    user_obj.interestedInSchools.set(School.objects.all().values_list('id', flat=True))
    user_obj.save()
    send_mail(user_mail=email, password=password, subject='welcome', welcome_token=welcome_token)


def update_password(email):
    user = User.objects.get(email=email)  # Note: this raises an exception in no-match, so a non-user can deduct if an email has signed up for Unimeet

    password = User.objects.make_random_password()
    user.set_password(password)
    user.save()
    send_mail(user_mail=email, password=password, subject='forgot_password')


def handle_contact_form(name, email, message):
    send_contact_form(name, email, message)
    send_contact_response(email)
