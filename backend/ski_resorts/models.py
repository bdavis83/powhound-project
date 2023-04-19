from django.db import models
from favorites.models import Favorites

class SkiResort (models.Model):
    name = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    region = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=7, decimal_places=4)
    longitude = models.DecimalField(max_digits=7, decimal_places=4)
    favorite = models.ForeignKey(Favorites, on_delete=models.CASCADE)