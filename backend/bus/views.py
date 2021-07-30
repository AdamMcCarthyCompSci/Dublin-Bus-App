from django.http import JsonResponse
import requests
from .models import *
from datetime import datetime
from rest_framework_simplejwt.backends import TokenBackend


def stops(request):
    stops = [{"id": stop.stop_id, "name": stop.stop_name, "stop_lat": stop.stop_lat, "stop_lon": stop.stop_lon}
             for stop in TfiStops.objects.all()]

    return JsonResponse({'stops': stops})


def leap(request):
    leap = [{"leap_card_locations_id": leap.leap_card_locations_id, "shop_name": leap.shop_name, "town": leap.town,
             "latitude": leap.latitude, "longitude": leap.longitude}
            for leap in LeapCardLocations.objects.all()]

    return JsonResponse({'leap': leap})


def routes(request):
    return JsonResponse({'routes': list(DublinBusRoutes.objects.values('routename').order_by('routename').distinct())})


def directions(request, route_id):
    directions = [
        {"id": route.dublin_bus_routes_id, "busnumber": route.routename, "routedescription": route.routedescription,
         "direction": route.direction, "platecode": route.platecode, "shortcommonname_en": route.shortcommonname_en}
        for route in DublinBusRoutes.objects.filter(routename=route_id, stopsequence=1).order_by('direction')]
    return JsonResponse({'directions': directions})


def boarding(request, route_id, direction_id):
    boarding = [
        {"id": route.dublin_bus_routes_id, "busnumber": route.routename, "routedescription": route.routedescription,
         "direction": route.direction, "platecode": route.platecode, "shortcommonname_en": route.shortcommonname_en, "stopsequence": route.stopsequence}
        for route in DublinBusRoutes.objects.filter(routename=route_id, direction=direction_id).order_by('stopsequence')]
    return JsonResponse({'boarding': boarding})


def alighting(request, route_id, direction_id, boarding_id):
    boarding = DublinBusRoutes.objects.get(routename=route_id, direction=direction_id, platecode=boarding_id)
    alighting = [
        {"id": route.dublin_bus_routes_id, "busnumber": route.routename, "routedescription": route.routedescription,
         "direction": route.direction, "platecode": route.platecode, "shortcommonname_en": route.shortcommonname_en, "stopsequence": route.stopsequence}
        for route in DublinBusRoutes.objects.filter(routename=route_id, direction=direction_id, stopsequence__gt=boarding.stopsequence).order_by('stopsequence')]
    return JsonResponse({'alighting': alighting})


def price(request):
    profile = None
    if request.META.get('HTTP_AUTHORIZATION'):
        token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
        data = TokenBackend(algorithm='HS256').decode(token, verify=False)
        user_id = (data['user_id'])
        profile = AuthUser.objects.get(pk=user_id)
    route = request.GET.get('route')
    direction = request.GET.get('direction')
    start = request.GET.get('start')
    end = request.GET.get('end')
    fare = request.GET.get('fare')
    url = 'https://dublinbus.ie/api/FareCalculateService/{route}/{direction}/{start}/{end}?format=json'.format(
        route=route,
        direction=direction,
        start=start,
        end=end)
    response = requests.get(url)
    fares = response.json()

    if profile:
        if profile.fare_type == 'Adult':
            return JsonResponse({"cash": next((x for x in fares['Fares'] if x['FareCategoryName'] == 'Adult Cash'), None)['Cost'],
                                 "leap": next((x for x in fares['Fares'] if x['FareCategoryName'] == 'Adult Leap'), None)['Cost']})
        if profile.fare_type == 'Child (Under 19)':
            return JsonResponse(
                {"cost": next((x for x in fares['Fares'] if x['FareCategoryName'] == 'Child Leap (Under 19)'), None)['Cost']})
        if profile.fare_type == 'Child (Under 16)':
            return JsonResponse(
                {"cost": next((x for x in fares['Fares'] if x['FareCategoryName'] == 'Child Cash (Under 16)'), None)['Cost']})

    return JsonResponse({"cost": next((x for x in fares['Fares'] if x['FareCategoryName'] == fare), None)['Cost']})


def weather(request):
    time = request.GET.get('time')
    f = '%Y-%m-%d %H:%M:%S'
    selected_date = datetime.strptime(time, f)

    response = [
        {"date": weather.date, "temp": weather.temp, "feels_like": weather.feels_like, "wind_speed": weather.wind_speed,
         "clouds_all": weather.clouds_all, "weather_id": weather.weather_id, "description": weather.description,
         "main_description": weather.main_description, "icon": weather.icon, "sunrise": weather.sunrise,
         "sunset": weather.sunset}
        for weather in Weather4DayHourlyForecast.objects.filter(date__gte=selected_date)]

    return JsonResponse({"weather": response[0]})
