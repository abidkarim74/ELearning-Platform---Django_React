from rest_framework import serializers
from .models import StudentProfile
from authentication.serializers import UserSerializer


class StudentProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = StudentProfile
        fields = ['id', 'gender', 'user']