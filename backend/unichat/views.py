from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
import json
from helpers import get_school_list


def get_schools(request):
    resp = JsonResponse({'schools': get_school_list()})
    resp['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return resp


@csrf_exempt
def signup(request):
    if request.method == "POST":
        signup_parameters = json.loads(request.body.decode('utf-8'))
    elif request.method == "OPTIONS":
        resp = HttpResponse('')
        resp['Access-Control-Allow-Headers'] = 'Content-Type'
    else:
        resp = HttpResponseBadRequest('')
    resp['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return resp
