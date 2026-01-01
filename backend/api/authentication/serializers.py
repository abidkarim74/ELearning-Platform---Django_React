from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password', 'profile_pic']
        
    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
             raise serializers.ValidationError(
                "A user with this email already exists."
            )
        return value.lower()
    
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        email = validated_data.pop('email')
        
        user = User(**validated_data, email=email)
        
        user.set_password(password)
        
        user.save()
        
        return user

            