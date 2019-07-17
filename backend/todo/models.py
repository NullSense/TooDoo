from django.db import models

class Todo(models.Model):
    """The ToDo app database"""

    entry = models.CharField(max_length=80)
    completed = models.BooleanField(default=False)
    archived = models.BooleanField(default=False)

    def _str_(self):
        return self.entry
