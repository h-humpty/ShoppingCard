from django.shortcuts import render
from rest_framework import viewsets, mixins, generics
from .models import Goods, GoodsCategory, GoodsImage
from .serializer import GoodsSerializer, GoodsCategorySerializer, GoodsImageSerializer
from rest_framework.response import Response


class GoodsView(viewsets.ModelViewSet):
    serializer_class = GoodsSerializer

    def get_queryset(self):
        queryset = Goods.objects.all()
        category = self.request.query_params.get('category')
        if category is not None:
            queryset = Goods.objects.filter(category=category)

        return queryset


class GoodsImageView(viewsets.ModelViewSet):
    serializer_class = GoodsImageSerializer
    queryset = GoodsImage.objects.all()

    # def create(self, request, *args, **kwargs):
    #
    #
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #
    #     return Response(serializer.data, status=201)


class CategoriesView(mixins.ListModelMixin, mixins.CreateModelMixin, mixins.DestroyModelMixin,
                     mixins.UpdateModelMixin, viewsets.GenericViewSet):
    serializer_class = GoodsCategorySerializer
    queryset = GoodsCategory.objects.all()
