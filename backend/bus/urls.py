from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from .views import HelloWorldView
from . import views

urlpatterns = [
    path('user/create/', views.post, name="create_user"),
    path('token/obtain/', TokenObtainPairView.as_view(), name='token_create'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('hello/', HelloWorldView.as_view(), name='hello_world'),
    path('stops', views.stops, name='stops'),
    path('routes', views.routes, name='routes'),
    path('price', views.price, name='price'),
    path('weather', views.weather, name='weather'),
    path('leap', views.leap, name='leap'),
]

