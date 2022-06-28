from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from django.contrib.auth import authenticate, models


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True, validators=[
        UniqueValidator(queryset=User.objects.all(), message="User name is already existed")])
    password = serializers.CharField(required=True, write_only=True)
    id = serializers.PrimaryKeyRelatedField(read_only=True)

    # active = serializers.IntegerField(read_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], password=validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('username', 'password', 'id')
        extra_kwargs = {'password': {'write_only': True}}


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(CustomTokenObtainPairSerializer, cls).get_token(user)
        token['username'] = user.username
        token['is_superuser'] = user.is_superuser
        token['email'] = user.email

        return token


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=60)
    password = serializers.CharField(max_length=128, write_only=True)
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)
    isStaff = serializers.BooleanField(read_only=True)

    def create(self, validated_date):
        pass

    def update(self, instance, validated_data):
        pass

    def validate(self, data):
        username = data['username']
        password = data['password']
        user = authenticate(username=username, password=password)

        if user is None:
            raise serializers.ValidationError("Invalid login credentials")

        try:
            print(user, type(user))
            refresh = RefreshToken.for_user(user)
            print(62,str(refresh))
            refresh_token = str(refresh)
            access_token = str(refresh.access_token)
            models.update_last_login(None, user)

            validation = {
                'username': user.username,
                'access': access_token,
                'refresh': refresh_token,
                'isStaff': True if user.is_staff else False,
            }

            return validation
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid login credentials")
