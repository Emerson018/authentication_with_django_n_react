# Generated by Django 5.0.6 on 2024-07-18 03:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_top_100_eletrica_2024'),
    ]

    operations = [
        migrations.AlterField(
            model_name='top_100_eletrica_2024',
            name='vendas',
            field=models.IntegerField(),
        ),
    ]
