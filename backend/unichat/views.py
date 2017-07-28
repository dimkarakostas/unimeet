from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
import json
from helpers import get_school_list, get_school_by_email, create_user
from django.contrib.auth import authenticate, login as Django_login, logout as Django_logout, update_session_auth_hash

FRONTEND_URL = 'http://unichat.eu'


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
        resp = HttpResponseRedirect(FRONTEND_URL)
    return resp


@csrf_exempt
def user_info(request):
    if request.user.is_authenticated():
        if request.method == 'GET':
            gender = str(request.user.gender)
            school = request.user.school.name
            university = request.user.school.university.name
            city = request.user.school.university.city.name
            country = request.user.school.university.city.country.name
            resp = JsonResponse({
                'gender': gender,
                'school': school,
                'university': university,
                'city': city,
                'country': country
            })
        elif request.method == 'POST':
            personal_params = json.loads(request.body.decode('utf-8'))
            gender = personal_params['gender']
            request.user.gender = gender
            request.user.save(update_fields=['gender'])
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
def check(request):
    if request.session.test_cookie_worked():
        message = 'worked'
    else:
        message = 'not working'
        request.session.set_test_cookie()
    resp = HttpResponse(message)
    return resp
