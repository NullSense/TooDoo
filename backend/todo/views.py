from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo
from django.contrib.auth.models import User
from todo.serializers import UserSerializer
from rest_framework import permissions

class TodoView(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
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
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser] # only the admin should be able to view the user table
