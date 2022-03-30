import json
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.views import View


class User(AbstractUser):
    pass

class RegisterView(View):
    def post(self, request):
        data = json.load(request.body.decode())
        email = data.email
        password = data.password
        phone = data.phone
