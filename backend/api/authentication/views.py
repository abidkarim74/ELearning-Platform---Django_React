from django.shortcuts import render
from .serializers import UserSerializer
from .jwt_tokens import generate_access_token, generate_refresh_token
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from .middleware import CustomAuthMiddleware
from django.conf import settings

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from django.contrib.auth import get_user_model
import jwt


User = get_user_model()

    
class LoginAPIView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        user = authenticate(email=email, password=password)
        
        if user == None:
            return Response('Invalid credentials!', status=status.HTTP_403_FORBIDDEN)
        
        acccess = generate_access_token(user)
        refresh = generate_refresh_token(user)
        
        response = Response({
            'access_token': acccess
        })
        
        response.set_cookie(
            key='refresh_token',
            value=refresh,
            max_age=7*24*60*60,
            secure=True,
            httponly=True,
            samesite='Strict'
        )
        
        return response
    
            
class SignupAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get('email')
        username = request.data.get('username')
        password = request.data.get('password')
        
        data = {
            'username': username,
            'password': password,
            'email': email,
            'first_name': first_name, 
            'last_name': last_name
        }
        
        serializer = UserSerializer(data=data)
        
        if serializer.is_valid(raise_exception=True) == False:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        user = serializer.save()
        
        access = generate_access_token(user)
        refresh = generate_refresh_token(user)
        
        response = Response({
            'access_token': access
        })
        
        response.set_cookie(
            key='refresh_token',
            value=refresh,
            max_age=7*24*60*60,
            httponly=True,
            secure=True,
            samesite='Strict'
        )
        
        return response
    
    
class LogoutAPIView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        response = Response(
            {"detail": "Successfully logged out."},
            status=status.HTTP_200_OK
        )
        response.delete_cookie(
            key="refresh_token",
            samesite="Strict"
        )
        return response
    
    
class RefreshTokenAPIViewh(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        
        if not refresh_token:
            print("inside")
            return Response({"error": "Unauthorized request!"}, status=401)
        
        try:
            payload = jwt.decode(refresh_token, settings.REFRESH_TOKEN_KEY, algorithms=['HS256'])
            print("fuck")
            user = User.objects.get(id=payload['id'])
            access_token = generate_access_token(user)
            
            return Response({'access_token': access_token})
        
        except jwt.ExpiredSignatureError:
            return Response({'error': 'Unauthorized request!'}, status=status.HTTP_401_UNAUTHORIZED)
        
        except jwt.InvalidTokenError:
            return Response({'error': 'Unauthorized request!'}, status=status.HTTP_401_UNAUTHORIZED)
        
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_401_UNAUTHORIZED)
        
    
class AuthUserAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CustomAuthMiddleware]

    def get(self, request):
        if request.user == None:
            return Response({'detail': 'You are not authenticated!'}, status=status.HTTP_401_UNAUTHORIZED)
        
        serializer = UserSerializer(request.user)
        
        return Response(serializer.data)