from .models import School


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
