from django.db import models

class Todo(models.Model):
    """The ToDo app database"""

    entry = models.CharField(max_length=80)
    done = models.BooleanField(default=False)
    dateTime = models.DateTimeField(auto_now=False, auto_now_add=True)
    color = models.CharField(max_length=7, default='default')

    def _str_(self):
        return self.entry
