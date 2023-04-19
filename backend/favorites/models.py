from django.db import models
from authentication.models import User

class Reply (models.Model):
    user = models.ForeignKey (User, on_delete=models.CASCADE)
    favorite = models.BooleanField(default=False)
    text = models.CharField (max_length=255)
