import os
import polars as pl
from datetime import datetime, timedelta

current_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(current_dir, "..", "..", "World-Stock-Prices-Dataset.csv")
df = pl.read_csv(csv_path)

def get_last_10_values(ticker):
    # Obtener la fecha actual y restar 20 años para simular correctamente la fecha
    fecha_actual = datetime.now()
    fecha_simulada = fecha_actual - timedelta(days=365.25 * 20) 
    # Convertir a string en formato YYYY-MM-DD
    fecha_simulada_str = fecha_simulada.strftime("%Y-%m-%d")
    
    # Filtrar y procesar datos
    ticker_data = (
        df.filter(pl.col("Ticker") == ticker)
        .filter(pl.col("Date") <= fecha_simulada_str)  
        .sort("Date", descending=True) 
        .head(10)
    )
    
    result = ticker_data.select([
        pl.col("Date").str.slice(0, 10).alias("fecha"),
        pl.col("Close").alias("precio")
    ])
    
    return result.to_dicts()

# Ejemplo de uso
ticker = 'AAPL'
last_10_values = get_last_10_values(ticker)

print(f"Últimos 10 valores para {ticker}:")
for item in last_10_values:
    print(f"Fecha: {item['fecha']}, Precio: {item['precio']}")
