from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser


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
    ano = models.IntegerField()
    mes = models.IntegerField()
    sigla_uf = models.CharField()
    tipo_consumo = models.CharField(max_length=20)
    numero_consumidores = models.IntegerField()
    consumo = models.FloatField(max_length=12)

#pra rodar o app IMPORTAR_CONSUMO.PY :
#python manage.py importar_consumo C:\Users\Gamer-PC\Downloads\ALURA\Python\Django\asd\authentication_with_django_n_react\backend\api\management\commands\consumo_eletrico.csv