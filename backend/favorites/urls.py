from django.urls import path, include
from favorites import views

urlpatterns = [
    path ('', views.get_favorites),
    
]