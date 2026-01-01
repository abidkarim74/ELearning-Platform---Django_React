from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField(unique=True)
    profile_pic = models.URLField(max_length=1000, null=True)    
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
