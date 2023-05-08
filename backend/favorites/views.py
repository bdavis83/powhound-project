from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Favorites
from .serializer import FavoritesSerializer
from ski_resorts.models import SkiResort
from django.shortcuts import get_object_or_404

@api_view (['GET'])
@permission_classes([IsAuthenticated])
def get_favorites(request):
    favorites = Favorites.objects.all()
    serializer = FavoritesSerializer (favorites, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_favorites(request):
    if request.method == 'POST':
        ski_resort_id = request.data.get('ski_resort_id')
        if not ski_resort_id:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        ski_resort = get_object_or_404(SkiResort, id=ski_resort_id)
        favorite, created = Favorites.objects.get_or_create(user=request.user, ski_resort=ski_resort)
        favorite.is_favorite = True
        favorite.save()
        serializer = FavoritesSerializer(favorite)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_favorites(request, favorite_id):
    favorite = get_object_or_404(Favorites, id=favorite_id, user=request.user)
    favorite.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_favorite(request, favorite_id):
    favorite = get_object_or_404(Favorites, id=favorite_id, user=request.user)
    serializer = FavoritesSerializer(favorite, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
