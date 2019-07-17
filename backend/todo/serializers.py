# from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'entry', 'completed', 'archived')
