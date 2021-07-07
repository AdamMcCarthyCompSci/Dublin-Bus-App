from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from bus.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('bus/', ResultsView.as_view(), name="something"),
    path('stops/', StopsView.as_view(), name="something"),
    path('routes/', Routes.as_view(), name="something"),
]