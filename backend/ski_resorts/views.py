from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import SkiResort
from .serializer import SkiResortSerializer
from django.shortcuts import get_object_or_404

@api_view (['GET'])
@permission_classes([AllowAny])
def get_all_ski_resorts(request):
    ski_resorts = SkiResort.objects.all()
    serializer = SkiResortSerializer(ski_resorts, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def add_ski_resort (request):
    if request.method=='POST':
        serializer = SkiResortSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
