from django.contrib import admin
from .models import Todo

class TodoAdmin(admin.ModelAdmin):
    list_display = ('entry', 'done', 'dateTime', 'color')

admin.site.register(Todo, TodoAdmin)
