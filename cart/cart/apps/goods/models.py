from django.db import models
from django.views import View


class GoodsCategory(models.Model):
    """
    Goods Categories
    """

    name = models.CharField(max_length=20)
    desc = models.TextField(max_length=30)

    def __str__(self):
        return self.name


class Goods(models.Model):
    """
    Goods
    """

    category = models.ForeignKey(GoodsCategory, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    price = models.FloatField(default=0)
    image = models.ImageField(upload_to="goods/images/", null=True, blank=True)

    def __str__(self):
        return self.name


