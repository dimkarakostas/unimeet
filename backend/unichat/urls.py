from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^get_schools$', views.get_schools, name='get_schools'),
    url(r'^signup$', views.signup, name='signup'),
    url(r'^login$', views.login, name='login'),
    url(r'^logout$', views.logout, name='logout'),
    url(r'^is_user_logged_in$', views.is_user_logged_in, name='is_user_logged_in'),
    url(r'^user_info$', views.user_info, name='user_info'),
    url(r'^user_interests$', views.user_interests, name='user_interests'),
    url(r'^change_password$', views.change_password, name='change_password'),
    url(r'^delete_user$', views.delete_user, name='delete_user'),
    url(r'^check$', views.check, name='check'),
]
