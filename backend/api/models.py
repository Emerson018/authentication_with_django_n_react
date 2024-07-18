from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator

class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


    def profile(self):
        profile = Profile.objects.get(user=self)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=1000)
    bio = models.CharField(max_length=100)
    image = models.ImageField(upload_to="user_images", default="default.jpg")
    verified = models.BooleanField(default=False)


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)


class Consumo_eletrica(models.Model):
    ano = models.IntegerField(max_length=4)
    mes = models.IntegerField(max_length=2)
    sigla_uf = models.CharField(max_length=3)
    tipo_consumo = models.CharField(max_length=20)
    numero_consumidores = models.IntegerField(max_length=12)
    consumo = models.FloatField(max_length=12)

class Produtos_tecnologia(models.Model):
    produto = models.CharField(max_length=15)
    preco = models.FloatField()
    total_vendas = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(1000)])
    avaliacao = models.FloatField(validators=[MinValueValidator(1.0), MaxValueValidator(5.0)])
    data_venda = models.DateField()
    tipo_produto = models.CharField(max_length=25)
    marca = models.CharField(max_length=25)
    garantia = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(36)])

#DE JANEIRO ATE JULHO
class Top_100_eletrica_2024(models.Model):
    codigo = models.IntegerField(primary_key=True)
    titulo = models.CharField(max_length=100)
    gama = models.CharField(max_length=1)
    vendas = models.IntegerField()
    margem_bruta = models.FloatField()
    carrinho_medio = models.FloatField()
    numero_clientes = models.IntegerField()
