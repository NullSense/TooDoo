# from django.contrib.auth.models import User, Group
from rest_framework import serializers, permissions
from .models import Todo
from django.contrib.auth.models import User

#serialize to json
class TodoSerializer(serializers.ModelSerializer):
    permission_classes = [permissions.IsAuthenticated]
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Todo
        fields = ('id', 'owner', 'entry', 'done', 'dateTime', 'color')


"""
Serializes the users that create the todos
"""
class UserSerializer(serializers.ModelSerializer):
    permission_classes = [permissions.IsAuthenticated]
    todo = serializers.PrimaryKeyRelatedField(many=True, queryset=Todo.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'todo']
