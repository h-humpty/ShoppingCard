from django.db import models
from users.models import User
from goods.models import Goods
from django.utils import timezone


class ShoppingCart(models.Model):
    """
    ShoppingCart
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    goods = models.ForeignKey(Goods, on_delete=models.CASCADE)
    numbers = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.user


class Order(models.Model):
    """
    Order
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    price = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name


class OrderItem(models.Model):
    """
    Order Item
    """

    # user = models.OneToOneField(User, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    goods = models.ForeignKey(Goods, on_delete=models.CASCADE)
    numbers = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.name
