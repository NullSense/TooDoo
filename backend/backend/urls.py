from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from rest_framework import routers
from todo import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib.auth.views import LoginView
from django.contrib.auth import views as auth_views

router = routers.DefaultRouter()
router.register(r'todos', views.TodoView, 'todo')
router.register(r'users', views.UserList, 'users')

urlpatterns = [
    url(r'^$', views.index, name='index'),
    path('admin/', admin.site.urls),
    url(r'^accounts/', include('django_registration.backends.activation.urls')),
    url(r'^accounts/', include('django.contrib.auth.urls')),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')), # add login to api
    # path('login/', views.login),
]

urlpatterns += staticfiles_urlpatterns() # static files for gunicorn
