from django.urls import path
from .views import LoginAPIView, SignupAPIView, LogoutAPIView, AuthUserAPIView, RefreshTokenAPIViewh


urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='login'),
    path('signup/', SignupAPIView.as_view(), name='signup'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('refresh-token/', RefreshTokenAPIViewh.as_view(), name='refresh-token'),
    path('auth-user/', AuthUserAPIView.as_view(), name='auth-user')
    
    
]