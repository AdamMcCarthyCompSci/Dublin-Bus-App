from rest_framework import serializers
from . models import *

class ReactSerializer(serializers.ModelSerializer):
	class Meta:
		model = TfiStops

		fields = ['stop_id', 'stop_name', 'stop_lat', 'stop_lon']

		fields = ['stop_id', 'stop_name', 'stop_lat', 'stop_lon']

		model2 = DublinBusRoutes
		field2 = ["dublin_bus_routes_id", "routename","routedescription","direction", "platecode","shortcommonname_en"]

