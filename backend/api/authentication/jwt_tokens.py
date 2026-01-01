import jwt
from django.conf import settings
from datetime import datetime, timedelta


def generate_access_token(user):
    payload = {
        'id': user.id,
        'exp': datetime.utcnow() + timedelta(minutes=7),
        'iat': datetime.utcnow()
    }
    token = jwt.encode(payload, settings.ACCESS_TOKEN_KEY, algorithm='HS256')
    
    return token


def generate_refresh_token(user):
    payload = {
        'id': user.id,
        'exp': datetime.utcnow() + timedelta(days=7),
        'iat': datetime.utcnow()
    }
    token = jwt.encode(payload, settings.REFRESH_TOKEN_KEY, algorithm='HS256')
    
    return token
    
    