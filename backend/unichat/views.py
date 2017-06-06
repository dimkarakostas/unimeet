from django.http import JsonResponse
from helpers import get_school_list


def get_schools(request):
    resp = JsonResponse({'schools': get_school_list()})
    resp['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return resp
