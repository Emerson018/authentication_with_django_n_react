import pandas as pd

excel_file = 'C:/Users/Gamer-PC/Downloads/ALURA/Python/Django/asd/authentication_with_django_n_react/backend/api/management/commands/dados_formatados/dados_eletrica_jan_jul.xlsx'


try:
    df = pd.read_excel(excel_file)

    # Remover a PRIMEIRA linha (header)
    df = df.iloc[1:]

    # Selecionar apenas as colunas desejadas
    colunas_desejadas = ['codigo', 'gama', 'vendas', 'margem_bruta', 'carrinho_medio', 'numero_clientes']
    df = df[colunas_desejadas]

    # Função para limpar e converter valores
    def limpar_valor(valor):
        if isinstance(valor, str):
            valor = valor.replace('R$', '').replace('%', '').replace(',', '.').strip()
        return float(valor) if isinstance(valor, (int, float)) else valor

    # Aplicar limpeza às colunas relevantes
    colunas_para_limpar = ['vendas', 'margem_bruta', 'carrinho_medio']
    for col in colunas_para_limpar:
        df[col] = df[col].apply(limpar_valor)

    # Salvar o DataFrame resultante em um arquivo CSV
    csv_file = 'C:/Users/Gamer-PC/Downloads/ALURA/Python/Django/asd/authentication_with_django_n_react/backend/api/management/commands/dados_formatados/arquivo.csv'
    df.to_csv(csv_file, index=False, encoding='utf-8', sep=',')

    print(f'Arquivo CSV salvo em: {csv_file}')

except ValueError as e:
    print(f'Erro ao ler planilha do arquivo Excel: {e}')