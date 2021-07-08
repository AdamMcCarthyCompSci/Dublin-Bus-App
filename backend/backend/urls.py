from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from bus.views import *
from django.urls import path


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('bus/', ResultsView.as_view(), name="something"),
    path('stops/', StopsView.as_view(), name="something"),
    path('routes/', Routes.as_view(), name="something"),
    path('price/',  Price.as_view(), name='home'),

]