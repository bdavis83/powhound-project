from django.db import models
from authentication.models import User
from ski_resorts.models import SkiResort


class Favorites (models.Model):
    user = models.ForeignKey (User, on_delete=models.CASCADE)
    ski_resort = models.ForeignKey(SkiResort, on_delete=models.CASCADE)
    is_favorite = models.BooleanField(default=False)


