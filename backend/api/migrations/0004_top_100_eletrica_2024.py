# Generated by Django 5.0.6 on 2024-07-18 03:27

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_produtos_tecnologia'),
    ]

    operations = [
        migrations.CreateModel(
            name='Top_100_eletrica_2024',
            fields=[
                ('codigo', models.IntegerField(primary_key=True, serialize=False, validators=[django.core.validators.MaxValueValidator(8)])),
                ('titulo', models.CharField(max_length=100)),
                ('gama', models.CharField(max_length=1)),
                ('vendas', models.IntegerField(validators=[django.core.validators.MaxValueValidator(8)])),
                ('margem_bruta', models.FloatField()),
                ('carrinho_medio', models.FloatField()),
                ('numero_clientes', models.IntegerField()),
            ],
        ),
    ]
