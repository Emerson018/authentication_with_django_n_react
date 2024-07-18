from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from . import views
from .views import ConsumoEletricaList, get_estados_sul, get_max_consumo_estados_sul, ProdutosTecnologiaList, Top100Eletrica2024List

urlpatterns = [
    path("token/", views.MyTokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("register/", views.RegisterView.as_view()),\
    path("test/", views.testEndPoint, name='test'),
    path("consumo-eletrica/", ConsumoEletricaList.as_view(), name='consumo-eletrica-list'),
    path("estados-sul/", get_estados_sul, name='get_estados_sul' ),
    path('max-consumo-estados-sul/', get_max_consumo_estados_sul, name='get_max_consumo_estados_sul'),
    path("produtos-tecnologia/", ProdutosTecnologiaList.as_view(), name='produtos-tecnologia-list'),
    path("top-100-eletrica-2024", Top100Eletrica2024List.as_view(), name='top-100-eletrica-2024-list' ),
]
