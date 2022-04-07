from django.shortcuts import render
from django.shortcuts import render
from rest_framework import viewsets, mixins, generics
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import ShoppingCart, Order, OrderItem
from .serializer import ShoppingCartSerializer, OrderItemSerializer, OrderSerializer


class ShoppingCartView(viewsets.ModelViewSet):
    serializer_class = ShoppingCartSerializer
    queryset = ShoppingCart.objects.all()
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)
    lookup_field = "goods"


class OrderView(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin, mixins.DestroyModelMixin,
                viewsets.GenericViewSet):
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        order = serializer.save()
        cartItems = ShoppingCart.objects.filter(user=self.request.user)
        for cartItem in cartItems:
            order_item = OrderItem()
            order_item.goods = cartItem.goods
            order_item.order = order
            order_item.numbers = cartItem.numbers

            order_item.save()
            cartItem.delete()
        return order


class OrderItemView(viewsets.ModelViewSet):
    serializer_class = OrderItemSerializer
    queryset = OrderItem.objects.all()
