from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo
from django.contrib.auth.models import User
from todo.serializers import UserSerializer
from rest_framework import permissions

from django.contrib.auth import authenticate, login
from rest_framework.decorators import api_view, permission_classes
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.views.generic import View
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.template import loader
from rest_framework.throttling import UserRateThrottle

class TodoView(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [UserRateThrottle]
    serializer_class = TodoSerializer # serialize to json
    queryset = Todo.objects.all() # get all objects in entry

    def get_queryset(self):
        """
        This view should return a list of all the todos
        for the currently authenticated user.
        """
        user = self.request.user
        if user.is_authenticated: # only allow logged in users
            if user.is_superuser: # the admin can see everything
                return Todo.objects.all()
            else: # the user can only see his own entries
                return Todo.objects.filter(owner=user)

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_authenticated:
            serializer.save(owner=self.request.user)

class UserList(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAdminUser] # only the admin should be able to view the user table
    throttle_classes = [UserRateThrottle]
    queryset = User.objects.all()
    serializer_class = UserSerializer

def index(request):
    template = loader.get_template('index.html')
    context = {}
    return HttpResponse(template.render(context, request))
