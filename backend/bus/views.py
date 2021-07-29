from django.http import JsonResponse
import requests
from rest_framework import permissions
from .models import *
from datetime import datetime


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
    route = request.GET.get('route')
    direction = request.GET.get('direction')
    start = request.GET.get('start')
    end = request.GET.get('end')
    url = 'https://dublinbus.ie/api/FareCalculateService/{route}/{direction}/{start}/{end}?format=json'.format(route=route,
                                                                                                               direction=direction,
                                                                                                               start=start,
                                                                                                               end=end)
    response = requests.get(url)
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
