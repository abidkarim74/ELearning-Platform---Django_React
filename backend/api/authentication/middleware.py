import jwt
from django.conf import settings
from rest_framework import authentication, exceptions
from django.contrib.auth import get_user_model


User = get_user_model()


class CustomAuthMiddleware(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        
        if not auth_header:
            return None
        
        try:
            prefix, token = auth_header.split(' ')
            
            if prefix.lower() != 'bearer':
                raise exceptions.AuthenticationFailed('You are not authorized!')
            
        except ValueError:
            raise exceptions.AuthenticationFailed('Invalid token!')
        
        try:
            payload = jwt.decode(token, settings.ACCESS_TOKEN_KEY, algorithms='HS256')
        
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token expired!')
        
        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed('Invalid token!')
        
        try:
            user = User.objects.get(id=payload['id'])
            
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed('You are not authenticated!')
        
        return (user, token)
                