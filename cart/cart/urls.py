"""cart URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin

from django.urls import path, include, re_path
from rest_framework_simplejwt.views import (

    TokenRefreshView,
)
from rest_framework.routers import DefaultRouter
from users.views import UserView, CustomTokenObtainPairView
from goods.views import GoodsView, CategoriesView
from shoppingcart.views import ShoppingCartView

# from users.views import UserView

router = DefaultRouter()

router.register(r'users', UserView)
router.register(r'goods', GoodsView, basename="goods")
router.register(r'category', CategoriesView, basename="category")
router.register(r'shoppingcart', ShoppingCartView, basename="shoppingcart")

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
