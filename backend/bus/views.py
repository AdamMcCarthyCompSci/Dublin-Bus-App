from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *

import requests
from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *

import requests
# Create your views here.


# class ResultsView(APIView):
	
# 	serializer_class = ReactSerializer

# 	def get(self, request):
# 		results = [ {"title": result.title,"directions": result.directions,"prediction": result.prediction}
# 		for result in Results.objects.all()]
# 		return Response(results)

# 	def post(self, request):

# 		serializer = ReactSerializer(data=request.data)
# 		if serializer.is_valid(raise_exception=True):
# 			serializer.save()
# 			return Response(serializer.data)

class StopsView(APIView):

	def get(self, request):
		stops = [ {"id": stop.stop_id, "name": stop.stop_name, "stop_lat": stop.stop_lat, "stop_lon": stop.stop_lon}
		for stop in TfiStops.objects.all()]
		return Response(stops)

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




