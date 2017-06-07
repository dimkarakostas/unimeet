from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
import json
from helpers import get_school_list, check_signup_email


def get_schools(request):
    resp = JsonResponse({'schools': get_school_list()})
    resp['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return resp


@csrf_exempt
def signup(request):
    if request.method == "POST":
        signup_parameters = json.loads(request.body.decode('utf-8'))
        if check_signup_email(signup_parameters['email']):
            resp = HttpResponse('Signup OK')
        else:
            resp = HttpResponseBadRequest('Invalid univesity email')
    elif request.method == "OPTIONS":
        resp = HttpResponse('')
        resp['Access-Control-Allow-Headers'] = 'Content-Type'
    else:
        resp = HttpResponseBadRequest('Invalid request method')
    resp['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return resp
