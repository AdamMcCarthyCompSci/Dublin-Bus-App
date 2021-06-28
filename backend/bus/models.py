from django.db import models

# Create your models here.

from django.db import models

# Create your models here.


class Results(models.Model):
    title = models.CharField(max_length=20)
    directions = models.CharField(max_length=200)
    prediction = models.CharField(max_length=200)