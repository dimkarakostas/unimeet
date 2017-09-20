from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
import json
from helpers import get_school_list, get_school_by_email, create_user, update_password, handle_contact_form, handle_service_stats, DuplicateEmailError
from django.contrib.auth import authenticate, login as Django_login, logout as Django_logout, update_session_auth_hash
from django.conf import settings
from models import User


def get_schools(request):
    resp = JsonResponse({'schools': get_school_list()})
    return resp


@csrf_exempt
def signup(request):
    signup_parameters = json.loads(request.body.decode('utf-8'))
    email = signup_parameters.get('email')
    school = get_school_by_email(email)
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    if school is not None:
        try:
            create_user(email, school)
            return HttpResponse('Signup OK')
        except DuplicateEmailError:
            return HttpResponse(content='Duplicate email', status=409)
        except ValueError:
            return HttpResponseBadRequest('Invalid email')
    return HttpResponseBadRequest('Invalid univesity email')


@csrf_exempt
def login(request):
    if request.method == 'POST':
        login_parameters = json.loads(request.body.decode('utf-8'))
        email = login_parameters.get('email')
        password = login_parameters.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            Django_login(request, user)
            return HttpResponse('Login OK')
    elif request.method == 'GET':
        welcome_token = request.GET.get('token')
        if welcome_token != '':
            user = User.objects.get(welcomeToken=welcome_token)
            if user is not None:
                user.welcomeToken = ''
                user.save(update_fields=['welcomeToken'])
                Django_login(request, user)
                return HttpResponseRedirect(settings.SERVICE_DATA['frontend']['url'])
    return HttpResponseBadRequest('Bad credentials')


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
        resp = HttpResponseRedirect(settings.SERVICE_DATA['frontend']['url'])
    return resp


@csrf_exempt
def user_info(request):
    if request.method == 'GET':
        if request.user.is_authenticated():
            user = request.user
        elif 'token' in request.GET:
            user = User.objects.get(token=request.GET['token'])
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
        gender = personal_params.get('gender')
        request.user.gender = gender
        request.user.save(update_fields=['gender'])
        return HttpResponse('OK')
    return HttpResponseBadRequest('Bad credentials')


@csrf_exempt
def user_interests(request):
    if request.method == 'GET':
        if request.user.is_authenticated():
            user = request.user
        elif 'token' in request.GET:
            user = User.objects.get(token=request.GET.get('token'))
        else:
            return HttpResponseBadRequest('Bad credentials')
        interestedInGender = str(user.interestedInGender)
        interestedInSchools = [s.id for s in user.interestedInSchools.all()]
        return JsonResponse({
            'interestedInGender': interestedInGender,
            'interestedInSchools': interestedInSchools
        })
    elif request.method == 'POST':
        interest_params = json.loads(request.body.decode('utf-8'))
        gender = interest_params.get('interestedInGender')
        schools = interest_params.get('interestedInSchools')
        request.user.interestedInGender = gender
        request.user.interestedInSchools.set(schools)
        request.user.save(update_fields=['interestedInGender'])
        return HttpResponse('OK')
    return HttpResponseBadRequest('Bad credentials')


@csrf_exempt
def change_password(request):
    if request.user.is_authenticated():
        email = request.user.email
        password_params = json.loads(request.body.decode('utf-8'))
        old = str(password_params.get('oldPassword'))
        new = str(password_params.get('newPassword'))
        verification = str(password_params.get('newPasswordVerification'))
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
def forgot_password(request):
    if request.method == 'POST':
        forgot_params = json.loads(request.body.decode('utf-8'))
        email = forgot_params.get('email')
        try:
            update_password(email)
        except Exception, e:
            print e
            return HttpResponseBadRequest('Error in password update')
    return HttpResponse('OK')


@csrf_exempt
def contact(request):
    if request.method == 'POST':
        contact_params = json.loads(request.body.decode('utf-8'))
        name = contact_params.get('name')
        email = contact_params.get('email')
        message = contact_params.get('message')
        try:
            handle_contact_form(name, email, message)
        except Exception, e:
            print e
            return HttpResponseBadRequest('Error in contact form')
    return HttpResponse('OK')


@csrf_exempt
def service_stats(request):
    if request.method == 'POST':
        service_params = json.loads(request.body.decode('utf-8'))
        name = service_params.get('name')
        token = service_params.get('token')
        activeUsers = service_params.get('activeUsers')
        try:
            handle_service_stats(name, token, activeUsers)
        except Exception, e:
            print e
            return HttpResponseBadRequest('Error in service stats update')
    return HttpResponse('OK')


@csrf_exempt
def check(request):
    if request.session.test_cookie_worked():
        message = 'worked'
    else:
        message = 'not working'
        request.session.set_test_cookie()
    resp = HttpResponse(message)
    return resp
