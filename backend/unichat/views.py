from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
import json
from helpers import get_school_list, get_school_by_email, create_user
from django.contrib.auth import authenticate, login as Django_login

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
def check(request):
    if request.session.test_cookie_worked():
        message = 'worked'
    else:
        message = 'not working'
        request.session.set_test_cookie()
    resp = HttpResponse(message)
    return resp
