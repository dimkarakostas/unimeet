import json
import os
import django
import logging

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from unichat.models import Country, City, University, School

level = logging.DEBUG
logger = logging.getLogger(__name__)
logger.setLevel(level)
logging.basicConfig(format='%(message)s')


def setup_schools(data):
    for country in data['countries']:
        country_obj = Country(name=country['name'])
        country_obj.save()
        logger.debug(country_obj.name)
        for city in country['cities']:
            city_obj = City(name=city['name'], country=country_obj)
            city_obj.save()
            logger.debug(2 * ' ' + city_obj.name)
            for university in city['universities']:
                university_obj = University(name=university['name'], city=city_obj)
                university_obj.save()
                logger.debug(4 * ' ' + university_obj.name)
                for school in university['schools']:
                    school_obj = School(name=school['name'], site=school['site'], mailRegex=school['mailRegex'], university=university_obj)
                    school_obj.save()
                    logger.debug(6 * ' ' + school_obj.name)


if __name__ == '__main__':
    try:
        with open(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'data.json'), 'r') as f:
            data = json.load(f)
    except IOError, err:
        logger.error('IOError: %s' % err)
        exit(1)
    setup_schools(data)
