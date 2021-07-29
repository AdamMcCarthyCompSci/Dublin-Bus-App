from django.urls import path
from . import views

urlpatterns = [
    path('stops', views.stops, name='stops'),
    path('routes', views.routes, name='routes'),
    path('price', views.price, name='price'),
    path('weather', views.weather, name='weather'),
    path('leap', views.leap, name='leap'),
]

