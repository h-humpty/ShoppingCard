from django.db import models
# from django.views import View
from django.utils import timezone


class GoodsCategory(models.Model):
    """
    Goods Categories
    """

    name = models.CharField(max_length=20)
    description = models.TextField(max_length=30)

    def __str__(self):
        return self.name


class Goods(models.Model):
    """
    Goods
    """

    category = models.ForeignKey(GoodsCategory, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    price = models.FloatField(default=0)
    description = models.CharField(max_length=100, default="")

    def __str__(self):
        return self.name


class GoodsImage(models.Model):
    """
    Goods Image
    """
    goods = models.ForeignKey(Goods, on_delete=models.CASCADE, related_name='goodsimage')
    image = models.ImageField(upload_to="static/images", null=True, blank=True)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.goods.name
