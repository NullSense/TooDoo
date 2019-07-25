from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from todo import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib.auth.views import LoginView

router = routers.DefaultRouter()
router.register(r'todos', views.TodoView, 'todo')
router.register(r'users', views.UserList, 'users')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')), # add login to api
    path('login/', LoginView.as_view(template_name='login.html'), name="login")
]

urlpatterns += staticfiles_urlpatterns() # static files for gunicorn
