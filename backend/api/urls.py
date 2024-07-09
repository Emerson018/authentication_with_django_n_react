from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from . import views
from .views import ConsumoEletricaList

urlpatterns = [
    path("token/", views.MyTokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("register/", views.RegisterView.as_view()),\
    path("test/", views.testEndPoint, name='test'),
     path("consumo-eletrica/", ConsumoEletricaList.as_view(), name='consumo-eletrica-list'),

]
