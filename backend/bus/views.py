from django.db.models.query_utils import select_related_descend
from django.http import JsonResponse
import requests
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializers import CustomUserSerializer
from rest_framework.permissions import AllowAny
from datetime import date, datetime, timedelta


def stops(request):
    stops = [{"id": stop.stop_id, "name": stop.stop_name, "stop_lat": stop.stop_lat, "stop_lon": stop.stop_lon}
             for stop in TfiStops.objects.all()]

    return JsonResponse({'stops': stops})

def leap(request):
    leap = [{"leap_card_locations_id": leap.leap_card_locations_id, "shop_name": leap.shop_name, "town": leap.town, "latitude": leap.latitude, "longitude": leap.longitude}
             for leap in LeapCardLocations.objects.all()]

    return JsonResponse({'leap': leap})

def routes(request):
    permission_classes = (permissions.AllowAny,)
    routes = [{"id": route.dublin_bus_routes_id, "busnumber": route.routename, "routedescription": route.routedescription,
               "direction": route.direction, "platecode": route.platecode, "shortcommonname_en": route.shortcommonname_en}
              for route in DublinBusRoutes.objects.all()]
    return JsonResponse({'routes': routes})


def price(request):
    # get the list of todos
    response = requests.get('https://dublinbus.ie/api/FareCalculateService/122/I/1423/1383?format=json')
    # transfer the response to json objects
    price = response.json()
    return JsonResponse({"price": price})

def weather(request):
    time = request.GET.get('time')
    f = '%Y-%m-%d %H:%M:%S'
    selected_date = datetime.strptime(time, f)

    
    response = [{"date": weather.date, "temp": weather.temp, "feels_like": weather.feels_like, "wind_speed": weather.wind_speed, "clouds_all": weather.clouds_all, "weather_id": weather.weather_id, "description": weather.description, 
                "main_description": weather.main_description, "icon": weather.icon, "sunrise": weather.sunrise, "sunset": weather.sunset}
              for weather in Weather4DayHourlyForecast.objects.filter(date__gte=selected_date)]

    return JsonResponse({"weather": response[0]})



@api_view(["POST"])
@permission_classes((AllowAny, ))
def post(request):
    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        if user:
            json = serializer.data
            return Response(json, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class HelloWorldView(APIView):
    permission_classes = (permissions.IsAuthenticated,)


