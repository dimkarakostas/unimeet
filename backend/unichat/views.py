from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
import json
from helpers import get_school_list, get_school_by_email, create_user
from django.contrib.auth import authenticate, login as Django_login, logout as Django_logout, update_session_auth_hash
import os
from django.conf import settings
from models import User

with open(os.path.join(os.path.dirname(settings.BASE_DIR), 'config', 'services.json'), 'r') as f:
    service_data = json.load(f)


def get_schools(request):
    resp = JsonResponse({'schools': get_school_list()})
    return resp


@csrf_exempt
def signup(request):
    signup_parameters = json.loads(request.body.decode('utf-8'))
    email = signup_parameters['email']
    school = get_school_by_email(email)
    if school is not None:
        create_user(email, school)
        resp = HttpResponse('Signup OK')
    else:
        resp = HttpResponseBadRequest('Invalid univesity email')
    return resp


@csrf_exempt
def login(request):
    login_parameters = json.loads(request.body.decode('utf-8'))
    email = login_parameters['email']
    password = login_parameters['password']
    user = authenticate(request, email=email, password=password)
    if user is not None:
        Django_login(request, user)
        resp = HttpResponse('Login OK')
    else:
        resp = HttpResponseBadRequest('Bad credentials')
    return resp


@csrf_exempt
def logout(request):
    if request.user.is_authenticated():
        Django_logout(request)
        resp = HttpResponse('Logout OK')
    else:
        resp = HttpResponseBadRequest('Bad credentials')
    return resp


@csrf_exempt
def is_user_logged_in(request):
    if request.user.is_authenticated():
        resp = JsonResponse({'email': request.user.email, 'token': request.user.token})
    else:
        resp = HttpResponseRedirect(service_data['frontend']['url'])
    return resp


@csrf_exempt
def user_info(request):
    if request.method == 'GET':
        if request.user.is_authenticated():
            user = request.user
        elif all(x in request.GET for x in ['auth', 'service', 'token']):
            if service_data[request.GET['service']]['auth'] == request.GET['auth']:
                user = User.objects.get(token=request.GET['token'])
            else:
                return HttpResponseBadRequest('Bad credentials')
        else:
            return HttpResponseBadRequest('Bad credentials')
        gender = str(user.gender)
        school = user.school.name
        university = user.school.university.name
        city = user.school.university.city.name
        country = user.school.university.city.country.name
        return JsonResponse({
            'gender': gender,
            'school': school,
            'university': university,
            'city': city,
            'country': country
        })
    elif request.method == 'POST' and request.user.is_authenticated():
        personal_params = json.loads(request.body.decode('utf-8'))
        gender = personal_params['gender']
        request.user.gender = gender
        request.user.save(update_fields=['gender'])
        return HttpResponse('OK')
    return HttpResponseBadRequest('Bad credentials')


@csrf_exempt
def user_interests(request):
    if request.user.is_authenticated():
        if request.method == 'GET':
            interestedInGender = str(request.user.interestedInGender)
            interestedInSchools = [s.id for s in request.user.interestedInSchools.all()]
            resp = JsonResponse({
                'interestedInGender': interestedInGender,
                'interestedInSchools': interestedInSchools
            })
        elif request.method == 'POST':
            interest_params = json.loads(request.body.decode('utf-8'))
            gender = interest_params['interestedInGender']
            schools = interest_params['interestedInSchools']
            request.user.interestedInGender = gender
            request.user.interestedInSchools.set(schools)
            request.user.save(update_fields=['interestedInGender'])
            resp = HttpResponse('OK')
    else:
        resp = HttpResponseBadRequest('Bad credentials')
    return resp


@csrf_exempt
def change_password(request):
    if request.user.is_authenticated():
        email = request.user.email
        password_params = json.loads(request.body.decode('utf-8'))
        old = str(password_params['oldPassword'])
        new = str(password_params['newPassword'])
        verification = str(password_params['newPasswordVerification'])
        user = authenticate(request, email=email, password=old)
        if user is not None:
            if new == verification:
                user.set_password(new)
                user.save()
                update_session_auth_hash(request, user)
                return HttpResponse('OK')
    return HttpResponseBadRequest('Bad credentials')


@csrf_exempt
def delete_user(request):
    if request.user.is_authenticated():
        if request.method == 'DELETE':
            request.user.delete()
            return HttpResponse('OK')
    return HttpResponseBadRequest('Bad credentials')


@csrf_exempt
def check(request):
    if request.session.test_cookie_worked():
        message = 'worked'
    else:
        message = 'not working'
        request.session.set_test_cookie()
    resp = HttpResponse(message)
    return resp
