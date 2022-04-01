from django.shortcuts import render
from rest_framework import viewsets, mixins, generics
from .models import Goods, GoodsCategory
from .serializer import GoodsSerializer, GoodsCategorySerializer


class GoodsView(mixins.ListModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = GoodsSerializer
    queryset = Goods.objects.all()


class CategoriesView(mixins.ListModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = GoodsCategorySerializer
    queryset = GoodsCategory.objects.all()
