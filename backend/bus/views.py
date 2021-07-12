from rest_framework import status, permissions
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializers import CustomUserSerializer


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
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        stops = [{"id": stop.stop_id, "name": stop.stop_name, "stop_lat": stop.stop_lat, "stop_lon": stop.stop_lon}
                 for stop in TfiStops.objects.all()]
        return Response(stops)


class StopsView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        stops = [{"id": stop.stop_id, "name": stop.stop_name, "stop_lat": stop.stop_lat, "stop_lon": stop.stop_lon}
                 for stop in TfiStops.objects.all()]
        return Response(stops)


class Routes(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        routes = [
            {"id": route.dublin_bus_routes_id, "busnumber": route.routename, "routedescription": route.routedescription,
             "direction": route.direction, "platecode": route.platecode, "shortcommonname_en": route.shortcommonname_en}
            for route in DublinBusRoutes.objects.all()]
        return Response(routes)


class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HelloWorldView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        return Response(data={"hello": "world"}, status=status.HTTP_200_OK)
