from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
# Create your views here.


class StopsView(APIView):

	def get(self, request):
		stops = [{"id": stop.stop_id, "name": stop.stop_name, "stop_lat": stop.stop_lat, "stop_lon": stop.stop_lon}
		for stop in TfiStops.objects.all()]
		return Response(stops)

class Routes(APIView):
	def get(self, request):
		routes = [{"id": route.dublin_bus_routes_id, "busnumber": route.routename,"routedescription":route.routedescription, "direction": route.direction, "platecode": route.platecode,"shortcommonname_en":route.shortcommonname_en}
		for route in DublinBusRoutes.objects.all()]
		return Response(routes)



