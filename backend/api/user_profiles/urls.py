from django.urls import path
from .views import StudentProfileDetailUpdateView


app_name = 'user_profiles'

urlpatterns = [
    path('', StudentProfileDetailUpdateView.as_view(), name='student')
]