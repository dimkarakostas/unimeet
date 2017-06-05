from django.http import JsonResponse
from .models import School


def get_schools(request):
    schools = School.objects.all()
    res_data = {'schools': []}
    for s in schools:
        school = {}
        school['id'] = s.id
        school['name'] = s.name
        school['site'] = s.site
        school['university'] = s.university.name
        school['city'] = s.university.city.name
        school['country'] = s.university.city.country.name
        res_data['schools'].append(school)
    resp = JsonResponse(res_data)
    resp['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return resp
