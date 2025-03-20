import polars as pl
import os

current_dir = os.path.dirname(os.path.abspath(__file__))

csv_path = os.path.join(current_dir, "..", "..", "World-Stock-Prices-Dataset-RAW.csv")

df = pl.read_csv(csv_path)

# Seleccionar las columnas deseadas
df_filtrado = df.select(['Date', 'Open', 'Close', 'Brand_Name', 'Ticker'])

# Guardar el nuevo DataFrame en un archivo CSV
df_filtrado.write_csv('World-Stock-Prices-Dataset.csv')

# Mostrar las primeras filas del DataFrame filtrado
print(df_filtrado.head())
