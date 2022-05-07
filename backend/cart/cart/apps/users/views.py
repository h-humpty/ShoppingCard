from django.shortcuts import render
from rest_framework.mixins import CreateModelMixin
from rest_framework import mixins
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from rest_framework import authentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, CustomTokenObtainPairSerializer, UserLoginSerializer
from .models import User

from rest_framework.views import APIView

from rest_framework.permissions import AllowAny, IsAuthenticated


# from django.contrib.auth.models import User

class UserView(CreateModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin, mixins.ListModelMixin,
               viewsets.GenericViewSet):
    """
    Users
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class AuthUserLoginView(APIView):
    serializer_class = UserLoginSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        valid = serializer.is_valid(raise_exception=True)
        # print(serializer.data)

        if valid:
            status_code = status.HTTP_200_OK

            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'User logged in successfully',
                'access': serializer.data['access'],
                'refresh': serializer.data['refresh'],
                'isStaff': serializer.data['isStaff']
            }

            return Response(response, status=status_code)
