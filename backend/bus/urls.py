from django.urls import path

from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('stops', views.stops, name='stops'),
    path('routes', views.routes, name='routes'),
    path('price',views.price,name='price')
]