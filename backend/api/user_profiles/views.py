from django.shortcuts import render
from .models import StudentProfile
from .serializers import StudentProfileSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from authentication.middleware import CustomAuthMiddleware


class StudentProfileDetailUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CustomAuthMiddleware]
    
    def get_student(self, user):
        try:
            print(f"Found: {user}")
            student = StudentProfile.objects.filter(user=user).first()
            print(f"Student: {student}")
            return student
        
        except StudentProfile.DoesNotExist:
            return None
        
        
    def get(self, request):
        print(f"user: {request.user.first_name}")
        
        student = self.get_student(request.user)
        
        
        if student == None:
            return Response({'detail': 'Student Profile not found!'}, status=404)
        
        serializer = StudentProfileSerializer(student)
        
        return Response(serializer.data)
        
