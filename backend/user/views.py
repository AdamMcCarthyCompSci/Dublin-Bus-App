from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import CustomUserSerializer
from .models import AuthUser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.backends import TokenBackend


class UserAccount(APIView):
    def get_permissions(self):
        if self.request.method == 'POST':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get(self, request):
        token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
        data = TokenBackend(algorithm='HS256').decode(token, verify=False)
        user_id = (data['user_id'])
        profile = AuthUser.objects.get(pk=user_id)

        return Response({
            'firstname': profile.first_name,
            'lastname': profile.last_name,
            'fare_type': profile.fare_type,
            'favourites': profile.favourites,
            'username': profile.username,
            'email': profile.email
        }, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
        data = TokenBackend(algorithm='HS256').decode(token, verify=False)
        user_id = (data['user_id'])
        profile = AuthUser.objects.get(pk=user_id)

        firstname = request.data['firstname']
        lastname = request.data['lastname']
        fare_type = request.data['fare_type']
        favourites = request.data['favourites']

        profile.first_name = firstname
        profile.last_name = lastname
        profile.fare_type = fare_type
        profile.favourites = favourites

        profile.save()

        return Response(status=status.HTTP_200_OK)

    def delete(self, request):
        token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
        data = TokenBackend(algorithm='HS256').decode(token, verify=False)
        user_id = (data['user_id'])
        profile = User.objects.get(pk=user_id)

        profile.delete()
        return Response(status=204)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def change_password(request):
    token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
    data = TokenBackend(algorithm='HS256').decode(token, verify=False)
    user_id = (data['user_id'])
    profile = User.objects.get(pk=user_id)

    old_password = request.data['old_password']
    new_password = request.data['new_password']
    confirm_password = request.data['confirm_password']

    if profile.check_password(old_password):
        if new_password == confirm_password:
            profile.password = make_password(new_password)
            profile.save()
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    return Response(status=status.HTTP_200_OK)
