from rest_framework import serializers
from .models import Favorites


class FavoritesSerializer (serializers.ModelSerializer):

    class Meta:
        model = Favorites
        fields = ['id', 'user', 'user_id', 'ski_resort_id', 'ski_resort', 'is_favorite']
        depth = 2
    user_id = serializers.IntegerField(write_only=True)
    ski_resort_id = serializers.IntegerField(write_only=True)