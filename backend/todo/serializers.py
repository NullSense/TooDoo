# from django.contrib.auth.models import User, Group
from rest_framework import serializers, permissions
from .models import Todo
from django.contrib.auth.models import User
from todo.permissions import IsOwner

#serialize to json
class TodoSerializer(serializers.ModelSerializer):
    # add an owner for the todo item
    owner = serializers.ReadOnlyField(source='owner.username')
    permission_classes = [IsOwner]

    class Meta:
        model = Todo
        fields = ('id', 'owner', 'entry', 'done', 'dateTime', 'color')


"""
Serializes the users that create the todos
"""
class UserSerializer(serializers.ModelSerializer):
    todo = serializers.PrimaryKeyRelatedField(many=True, queryset=Todo.objects.all())
    permission_classes = [permissions.IsAuthenticated]

    class Meta:
        model = User
        fields = ['id', 'username', 'todo']
