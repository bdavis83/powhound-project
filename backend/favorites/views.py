from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Favorites
from .serializer import FavoritesSerializer
from django.shortcuts import get_list_or_404

@api_view (['GET'])
@permission_classes([AllowAny])
def get_all_favorites(request):
    favorites = Favorites.objects.all()
    serializer = FavoritesSerializer (favorites, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def add_favorite (request):
    if request.method=='POST':
        serializer = FavoritesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method=='GET':
        favorite = Favorites.objects.filter(user_id=request.user.id)
        serializer = FavoritesSerializer(ski_resorts, many=True)
        return Response (serializer.data)