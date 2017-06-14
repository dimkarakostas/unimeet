from .models import School, User
import re


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
    user_obj = User.objects.create_user(email=email, school=school, password=password)
    user_obj.interestedInSchools.set(School.objects.all().values_list('id', flat=True))
    user_obj.save()
    # TODO: Send signup mail to user
