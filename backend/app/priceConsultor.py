import os
import polars as pl
from datetime import datetime, timedelta
import dbHelper
from decimal import Decimal

current_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(current_dir, "..", "..", "Stocks_Prueba.csv")
print("Cargando csv...")
df = pl.read_csv(csv_path)

def obtener_datos_activo(ticker, periodo):
    fecha_actual = datetime.now()
    # fecha_simulada = fecha_actual - timedelta(days=365.25 * 20) 
    # fecha_simulada_str = fecha_simulada.strftime("%Y-%m-%d")
    fecha_actual_str = fecha_actual.strftime("%Y-%m-%d")
    # print(fecha_simulada_str)
    base_query = (
        df.filter(pl.col("Ticker") == ticker)
        .filter(pl.col("Date") <= fecha_actual_str)
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
    # fecha_simulada = fecha_actual - timedelta(days=365.25 * 20) 
    # fecha_simulada_str = fecha_simulada.strftime("%Y-%m-%d")
    fecha_actual_str = fecha_actual.strftime("%Y-%m-%d")
    base_query = (
        df.filter(pl.col("Ticker") == ticker)
        .filter(pl.col("Date") <= fecha_actual_str)
    )

    ticker_data = base_query.head(1)

    precio_actual = ticker_data.select([pl.col("Close").alias("precio")])

    precio_actual = precio_actual.to_dict()['precio'][0]
    precio_actual = round(precio_actual, 4)

    return precio_actual

async def verificar_ventas_automaticas(transacciones):
    ventas = []
    for transaccion in transacciones:
        username = transaccion[0]
        simbolo_activo = transaccion[1]
        cantidad = transaccion[2]
        precio_promedio = transaccion[3]
        stop_loss = transaccion[4]
        take_profit = transaccion[5]
        precio_actual = await obtener_valor_actual(simbolo_activo)
        precio_actual = Decimal.from_float(precio_actual).quantize(Decimal('0.0001'))
        precio_promedio = (precio_promedio).quantize(Decimal('0.0001'))
        porcentaje_variacion = ((precio_actual - precio_promedio) / precio_promedio * 100).quantize(Decimal('0.0001'))
        print(f"Activo: {simbolo_activo}, Porcentaje de variación: {porcentaje_variacion}%")

        # Comprobar si se cumplen las condiciones de venta
        cumple_tp = porcentaje_variacion >= take_profit
        cumple_sl = porcentaje_variacion <= -stop_loss


        print(f"Cumple TP: {cumple_tp}, Cumple SL: {cumple_sl}")

        if cumple_tp or cumple_sl:
            ventas.append(transaccion)
        else:
            print(f"No se cumplen las condiciones para venta automática de {simbolo_activo}")
    print("Las ventas automáticas son las siguientes:")
    print(ventas)
    return ventas
            
    
# Ejemplo de uso
# ticker = 'AAPL'
# ultimo_valor = obtener_valor_actual(ticker)
# print(f"Último valor de {ticker}: {ultimo_valor}")