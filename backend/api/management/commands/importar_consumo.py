import pandas as pd
from django.core.management.base import BaseCommand
from api.models import Consumo_eletrica
from django.core.exceptions import ValidationError

class Command(BaseCommand):
    help = 'Importa produtos de um arquivo CSV para um banco de dados em Django.'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Caminho do CSV a ser importado.')

    def handle(self, *args, **kwargs):
        csv_file = kwargs['csv_file']

        data = pd.read_csv(csv_file)

        lista_dos_dados = []
        batch_size = 1000
        errors = []

        for _, row in data.iterrows():
            numero_consumidores = row['numero_consumidores'] if pd.notnull(row['numero_consumidores']) else 0
            item = Consumo_eletrica(
                ano=row['ano'],
                mes=row['mes'],
                sigla_uf=row['sigla_uf'],
                tipo_consumo=row['tipo_consumo'],
                numero_consumidores=numero_consumidores,
                consumo=row['consumo']
            )

            try:
                item.clean()
                lista_dos_dados.append(item)

                if len(lista_dos_dados) >= batch_size:
                    Consumo_eletrica.objects.bulk_create(lista_dos_dados)
                    lista_dos_dados = []
            except ValidationError as e:
                errors.append(f'Erro na linha {_}: {e}')

        # Salvar o restante
        if lista_dos_dados:
            Consumo_eletrica.objects.bulk_create(lista_dos_dados)

        if errors:
            self.stdout.write(self.style.ERROR('Alguns itens não foram salvos.'))
            for error in errors:
                self.stdout.write(self.style.ERROR(error))
        else:
            self.stdout.write(self.style.SUCCESS('PRODUTOS SALVOS COM SUCESSO!'))
