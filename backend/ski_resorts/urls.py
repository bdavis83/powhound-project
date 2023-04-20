from django.urls import path, include
from ski_resorts import views

urlpatterns = [
    path ('', views.add_ski_resort),
    path('all/', views.get_all_ski_resorts)
    
]