from django.http import JsonResponse
import requests
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializers import CustomUserSerializer
from rest_framework.permissions import AllowAny

# Create your views here.

def stops(request):
    stops = [{"id": stop.stop_id, "name": stop.stop_name, "stop_lat": stop.stop_lat, "stop_lon": stop.stop_lon}
             for stop in TfiStops.objects.all()]

    return JsonResponse({'stops':stops})


def routes(request):
    permission_classes = (permissions.AllowAny,)
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


