
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from datetime import date
from .models import *


class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = TfiStops
        fields = ['stop_id', 'stop_name', 'stop_lat', 'stop_lon']

        model2 = DublinBusRoutes
        field2 = ["dublin_bus_routes_id", "routename", "routedescription", "direction", "platecode",
                  "shortcommonname_en"]


class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True
    )
    username = serializers.CharField()
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = AuthUser
        fields = ('email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.password = make_password(password)
        instance.is_superuser = False
        instance.is_staff = False
        instance.is_active = True
        instance.date_joined = date.today()
        instance.save()
        return instance
