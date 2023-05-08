from django.urls import path, include
from favorites import views

urlpatterns = [
    path ('', views.get_favorites),
    path ('add/', views.add_to_favorites),
    path ('remove/<int:favorite_id>/', views.remove_from_favorites)
]