from rest_framework import serializers
from .models import Favorites

class FavoritesSerializer (serializers.Serializer):
    class Meta:
        model = Favorites
        fields = ['user', 'ski_resort', 'text', 'is_favorite','user_id']
        depth = 1