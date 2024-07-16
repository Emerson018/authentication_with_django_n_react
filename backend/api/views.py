from django.shortcuts import render

from api.models import User, Consumo_eletrica, Produtos_tecnologia
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer, ConsumoEletricaSerializer, ProdutosTecnologiaSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated

from django.http import JsonResponse
from django.db.models import Max, F

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = ([AllowAny])
    serializer_class = RegisterSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Boa {request.user}, a API respondeu ao GET request."
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "'Hello World!'"
        data = f'Dale, a API respondeu ao POST request com o texto: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)

#dados da eletrica

class ConsumoEletricaList(generics.ListAPIView):
    queryset = Consumo_eletrica.objects.all()
    serializer_class = ConsumoEletricaSerializer

def get_estados_sul(request):
    estados_sul = Consumo_eletrica.objects.filter(sigla_uf__in=['RS', 'SC', 'PR'])
    dados = list(estados_sul.values())
    return JsonResponse(dados, safe=False)

def get_max_consumo_estados_sul(request):
    max_consumo = Consumo_eletrica.objects.filter(sigla_uf__in=['RS', 'SC', 'PR']) \
    .values('sigla_uf').annotate(max_consumo=Max('consumo'))

    dados = list(max_consumo)
    return JsonResponse(dados, safe=False)

#dados de produtos de tecnologia

class ProdutosTecnologiaList(generics.ListAPIView):
    queryset = Produtos_tecnologia.objects.all()
    serializer_class = ProdutosTecnologiaSerializer