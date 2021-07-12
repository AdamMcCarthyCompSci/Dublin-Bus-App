from django.http import HttpResponse,JsonResponse
from . serializer import *
from django.shortcuts import render
import requests


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


def stops(request):
    stops = [{"id": stop.stop_id, "name": stop.stop_name, "stop_lat": stop.stop_lat, "stop_lon": stop.stop_lon}
             for stop in TfiStops.objects.all()]

    return JsonResponse({'stops':stops})

def routes(request):
    routes = [{"id": route.dublin_bus_routes_id, "busnumber": route.routename, "routedescription": route.routedescription,
               "direction": route.direction, "platecode": route.platecode, "shortcommonname_en": route.shortcommonname_en}
              for route in DublinBusRoutes.objects.all()]
    return JsonResponse({'routes':routes})

def price(request):
    # get the list of todos
    response = requests.get('https://dublinbus.ie/api/FareCalculateService/122/I/1423/1383?format=json')
    # transfer the response to json objects
    price = response.json()
    return JsonResponse({"price": price})

