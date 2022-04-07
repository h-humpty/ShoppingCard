import json
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.views import View


class User(AbstractUser):
    pass

    def __str__(self):
        return self.username

