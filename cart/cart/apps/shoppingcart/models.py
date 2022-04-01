from django.db import models
from users.models import User
from goods.models import Goods


class ShoppingCart(models.Model):
    """
    Cart Items
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    goods = models.ForeignKey(Goods, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("user", "goods")

    def __str__(self):
        return "%s(%d)".format(self.goods.name)
