from django.shortcuts import render
from rest_framework import viewsets, mixins, generics
from .models import Goods, GoodsCategory
from .serializer import GoodsSerializer, GoodsCategorySerializer


class GoodsView(mixins.ListModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = GoodsSerializer

    def get_queryset(self):
        queryset = Goods.objects.all()
        category = self.request.query_params.get('category')
        if category is not None:
            queryset = Goods.objects.filter(category=category)

        return queryset


class CategoriesView(mixins.ListModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = GoodsCategorySerializer
    queryset = GoodsCategory.objects.all()
