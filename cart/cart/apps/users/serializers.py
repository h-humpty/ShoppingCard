from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True, validators=[
        UniqueValidator(queryset=User.objects.all(), message="User name is already existed")])
    password = serializers.CharField(required=True, write_only=True)

    # active = serializers.IntegerField(read_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], password=validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {'password': {'write_only': True}}


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(CustomTokenObtainPairSerializer, cls).get_token(user)
        token['username'] = user.username
        token['is_superuser'] = user.is_superuser
        token['email'] = user.email

        return token
