from rest_framework import serializers
from .models import Reply

class ReplySerializer (serializers.Serializer):
    class Meta:
        model = Reply
        fields = ['user', 'favorite', 'text', 'user_id']
        depth = 1