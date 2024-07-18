import pandas as pd
from django.core.management.base import BaseCommand
from api.models import Top_100_eletrica_2024
from django.core.exceptions import ValidationError

class Command(BaseCommand):
    help = 'Importa produtos de um arquivo CSV para um banco de dados em Django.'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Caminho do CSV a ser importado.')

    def handle(self, *args, **kwargs):
        csv_file = kwargs['csv_file']

        try:
            data = pd.read_csv(csv_file)
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR('Arquivo CSV não encontrado.'))
            return

        lista_dos_dados = []
        batch_size = 1000
        errors = []
#codigo,titulo,gama,vendas,margem_bruta,carrinho_medio,numero_clientes
        for _, row in data.iterrows():
            item = Top_100_eletrica_2024(
                codigo=row['codigo'],
                titulo=row['titulo'],
                gama=row['gama'],
                vendas=row['vendas'],
                margem_bruta=row['margem_bruta'],
                carrinho_medio=row['carrinho_medio'],
                numero_clientes=row['numero_clientes'],
            )

            try:
                item.full_clean()  # Valida o modelo
                lista_dos_dados.append(item)

                if len(lista_dos_dados) >= batch_size:
                    Top_100_eletrica_2024.objects.bulk_create(lista_dos_dados)
                    lista_dos_dados = []
            except ValidationError as e:
                errors.append(f'Erro na linha {_ + 1}: {e}')

        # Salvar o restante
        if lista_dos_dados:
            Top_100_eletrica_2024.objects.bulk_create(lista_dos_dados)

        if errors:
            self.stdout.write(self.style.ERROR('Alguns itens não foram salvos.'))
            for error in errors:
                self.stdout.write(self.style.ERROR(error))
        else:
            self.stdout.write(self.style.SUCCESS('PRODUTOS SALVOS COM SUCESSO!'))
