import pandas as pd
from datetime import datetime

excel_file = 'C:/Users/Gamer-PC/Downloads/ALURA/Python/Django/asd/authentication_with_django_n_react/backend/api/management/commands/dados_formatados/dados_leroy.xlsx'

try:
    df = pd.read_excel(excel_file)

    # Remover a PRIMEIRA linha (header)
    df = df.iloc[1:]

    # Selecionar apenas as colunas desejadas
    colunas_desejadas = ['codigo','titulo', 'gama', 'vendas', 'margem_bruta', 'carrinho_medio', 'numero_clientes']
    df = df[colunas_desejadas]

    # Função para limpar e converter valores
    def limpar_valor(valor, coluna):
        if isinstance(valor, str):
            valor = valor.replace('R$', '').replace('%', '').replace(',', '.').replace(' ', '').strip()
        if isinstance(valor, (int, float)):
            valor = float(valor)
            if coluna == 'numero_clientes':
                return int(valor)
            return valor
        return valor

    # Aplicar limpeza às colunas relevantes
    colunas_para_limpar = ['vendas', 'margem_bruta', 'carrinho_medio', 'numero_clientes']
    for col in colunas_para_limpar:
        df[col] = df[col].apply(lambda x: limpar_valor(x, col))

    # Obter a data atual e formatá-la
    data_hoje = datetime.now().strftime('%Y%m%d')

    # Gerar o nome do arquivo com a data atual
    csv_file = f'C:/Users/Gamer-PC/Downloads/ALURA/Python/Django/asd/authentication_with_django_n_react/backend/api/management/commands/dados_formatados/dados_leroy_{data_hoje}.csv'

    # Salvar o DataFrame resultante em um arquivo CSV
    df.to_csv(csv_file, index=False, encoding='utf-8', sep=',')

    print(f'Arquivo CSV salvo em: {csv_file}')

except ValueError as e:
    print(f'Erro ao ler planilha do arquivo Excel: {e}')
