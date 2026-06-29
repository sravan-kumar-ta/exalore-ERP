from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

from account.views import RegisterAPIView

urlpatterns = [
    path("register/", RegisterAPIView.as_view()),
    path("login/", TokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
]
