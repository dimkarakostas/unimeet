from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^get_schools$', views.get_schools, name='get_schools'),
    url(r'^signup$', views.signup, name='signup'),
    url(r'^login$', views.login, name='login'),
]
