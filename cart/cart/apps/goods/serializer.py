from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Goods, GoodsCategory, GoodsImage


class GoodsImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoodsImage
        fields = '__all__'


class GoodsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GoodsCategory
        fields = "__all__"


class GoodsSerializer(serializers.ModelSerializer):
    # category = serializers.StringRelatedField()
    category_id = serializers.IntegerField(read_only=True)
    images = GoodsImageSerializer(many=True, read_only=True)

    class Meta:
        model = Goods
        fields = "__all__"
