from django.contrib import admin
from api.models import User,Profile,Consumo_eletrica

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']


class ProfileAdmin(admin.ModelAdmin):
    list_editable = ['verified']
    list_display = ['user', 'full_name' ,'verified']

class ConsumoEletricaAdmin(admin.ModelAdmin):
    list_display = ['ano', 'mes', 'sigla_uf', 'tipo_consumo', 'numero_consumidores', 'consumo']


admin.site.register(User, UserAdmin)
admin.site.register( Profile,ProfileAdmin)
admin.site.register( Consumo_eletrica, ConsumoEletricaAdmin)