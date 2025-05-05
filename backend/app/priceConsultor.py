import os
import polars as pl
from datetime import datetime, timedelta

current_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(current_dir, "..", "..", "World-Stock-Prices-Dataset.csv")
print("Cargando csv...")
df = pl.read_csv(csv_path)

def obtener_datos_activo(ticker, periodo):
    fecha_actual = datetime.now()
    fecha_simulada = fecha_actual - timedelta(days=365.25 * 20) 
    fecha_simulada_str = fecha_simulada.strftime("%Y-%m-%d")
    # print(fecha_simulada_str)
    base_query = (
        df.filter(pl.col("Ticker") == ticker)
        .filter(pl.col("Date") <= fecha_simulada_str)
        .sort("Date", descending=True)
    )

    match periodo:
        case "anno":
            ticker_data = base_query.head(365)
        case "mes":
            ticker_data = base_query.head(30)
        case "semana":
            ticker_data = base_query.head(7)
        case _:
            raise ValueError("Periodo no válido. Use 'anno', 'mes' o 'semana'.")

    result = ticker_data.select([
        pl.col("Date").str.slice(0, 10).alias("fecha"),
        pl.col("Close").alias("precio")
    ])
    
    # Devolver lista invertida
    lista = result.to_dicts()
    return lista[::-1]

async def obtener_valor_actual(ticker):
    fecha_actual = datetime.now()
    fecha_simulada = fecha_actual - timedelta(days=365.25 * 20) 
    fecha_simulada_str = fecha_simulada.strftime("%Y-%m-%d")
    # print(fecha_simulada_str)
    base_query = (
        df.filter(pl.col("Ticker") == ticker)
        .filter(pl.col("Date") <= fecha_simulada_str)
    )

    ticker_data = base_query.head(1)

    precio_actual = ticker_data.select([
        pl.col("Close").alias("precio")
    ])
    #extraer el precio actual a una variable guardando solo el valor del precio de manera más sencilla 
    precio_actual = precio_actual.to_dict()['precio'][0]
    precio_actual = round(precio_actual, 4)

    return precio_actual

# async def verificar_compraventa_automaticas(transacciones):
    # Verificar si hay transacciones de compra o venta automáticas
    
# Ejemplo de uso
# ticker = 'AAPL'
# ultimo_valor = obtener_valor_actual(ticker)
# print(f"Último valor de {ticker}: {ultimo_valor}")