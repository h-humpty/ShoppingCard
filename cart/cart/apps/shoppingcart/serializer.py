from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import ShoppingCart, Order, OrderItem
from goods.models import Goods
from goods.serializer import GoodsSerializer
from users.serializers import UserSerializer


class ShoppingCartSerializer(serializers.ModelSerializer):
    goods = serializers.PrimaryKeyRelatedField(required=True, queryset=Goods.objects.all())
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = ShoppingCart
        fields = "__all__"

    def create(self, validated_data):
        user = self.context["request"].user
        goods = validated_data["goods"]
        numbers = validated_data["numbers"]

        existed = ShoppingCart.objects.filter(user=user, goods=goods)

        if existed:
            existed = existed[0]
            existed.numbers += numbers
            existed.save()
        else:
            existed = ShoppingCart.objects.create(**validated_data)

        return existed


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"
