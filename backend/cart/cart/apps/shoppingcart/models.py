from django.db import models
from users.models import User
from goods.models import Goods
from django.utils import timezone


class ShoppingCart(models.Model):
    """
    ShoppingCart
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    goods = models.ForeignKey(Goods, on_delete=models.CASCADE, related_name='goods')
    numbers = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    # def __str__(self):
    #     return self.goods


class Order(models.Model):
    """
    Order
    """

    ORDER_STATUS = (
        ("PAID", "SUCCESSFUL"),
        ("UN_PAID", "PENDING")
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_price = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    pay_status = models.CharField(choices=ORDER_STATUS, default="UN_PAID", max_length=30)
    pay_time = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.user


class OrderItem(models.Model):
    """
    Order Item
    """

    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    goods = models.ForeignKey(Goods, on_delete=models.CASCADE, related_name='orderitem')
    numbers = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.order
