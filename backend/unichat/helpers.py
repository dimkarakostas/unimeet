from .models import School, User
import re
from django.contrib.auth.models import User as Django_User
from django.contrib.auth.hashers import make_password


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
    password = Django_User.objects.make_random_password()
    db_password = make_password(password)
    user_obj = User(email=email, school=school, password=db_password)
    user_obj.save()
    user_obj.interestedInSchools.set(School.objects.all().values_list('id', flat=True))
    # TODO: Send signup mail to user
