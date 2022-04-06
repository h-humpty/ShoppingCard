from django.shortcuts import render
from django.shortcuts import render
from rest_framework import viewsets, mixins, generics
from .models import ShoppingCart
from .serializer import ShoppingCartSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

class ShoppingCartView(viewsets.ModelViewSet):
    serializer_class = ShoppingCartSerializer
    queryset = ShoppingCart.objects.all()
    permission_classes = (IsAuthenticated, )
    authentication_classes = (JWTAuthentication, )
    lookup_field = "goods"

