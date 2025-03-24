import asyncpg
from pwEncrypt import *

DATABASE_CONFIG = {
    "user": "postgres",
    "password": "postgres",
    "database": "tfg",
    "host": "localhost",
    "port": 5432,
}

connection_pool = None

async def init_db():
    global connection_pool
    try:
        print("Inicializando la base de datos...")
        connection_pool = await asyncpg.create_pool(**DATABASE_CONFIG)
        print("Base de datos inicializada correctamente.")
    except Exception as e:
        print(f"Error al inicializar la base de datos: {e}")
        raise

async def close_db():
    if connection_pool:
        print("Cerrando la conexión a la base de datos...")
        await connection_pool.close()
        print("Conexión a la base de datos cerrada correctamente.")

async def validarLogin(username: str, password: str) -> bool:
    if not connection_pool:
        raise Exception("La conexión a la base de datos no ha sido inicializada")
    
    try:
        async with connection_pool.acquire() as connection:
            query = "SELECT contrasenna FROM usuarios WHERE nombre_usuario = $1"
            stored_password = await connection.fetchval(query, username)
            if (stored_password is not None and verify_password(password, stored_password)):
                return True
            
            return False
    except Exception as e:
        print(f"Error en loginValidation: {e}")
        return False

async def registrarUsuario(email: str, username: str, password: str) -> str:
    if not connection_pool:
        raise Exception("La conexión a la base de datos no ha sido inicializada")

    try:
        async with connection_pool.acquire() as connection:
            query = "INSERT INTO usuarios (nombre_usuario, correo_electronico, contrasenna, saldo_virtual) VALUES ($1, $2, $3, 1000)"
            password_hash = hash_password(password)
            await connection.execute(query, username, email, password_hash)
            return "Usuario registrado exitosamente"
    except asyncpg.UniqueViolationError:
        #Si ya existe ese correo o nombre de usuario en la base de datos devolvemos un error
        return "No se pudo crear el usuario. El nombre de usuario o correo electrónico ya está en uso."
    except Exception as e:
        print(f"Error al registrar usuario: {e}")
        return f"Error al registrar usuario: {str(e)}"
    
async def consultar_saldo_disponible(username: str) -> float:
    if not connection_pool:
        raise Exception("La conexión a la base de datos no ha sido inicializada")

    try:
        async with connection_pool.acquire() as connection:
            query = "SELECT saldo_virtual FROM usuarios WHERE nombre_usuario = $1"
            saldo = await connection.fetchval(query, username)
            if saldo is None:
                raise ValueError(f"No se encontró el usuario: {username}")
            print("El saldo obtenido es de:", saldo)
            return float(saldo)
    except Exception as e:
        print(f"Error al consultar saldo: {e}")
        raise

async def actualizar_saldo(username: str, cantidad: float):
    if not connection_pool:
        raise Exception("La conexión a la base de datos no ha sido inicializada")

    try:
        async with connection_pool.acquire() as connection:
            query = "UPDATE usuarios SET saldo_virtual = saldo_virtual - $1 WHERE nombre_usuario = $2"
            await connection.execute(query, cantidad, username)
    except Exception as e:
        print(f"Error al actualizar saldo: {e}")
        raise

async def registrar_compra(username: str, activo: str, cantidad: float, precio: float):
#  id_transaccion | id_usuario | simbolo_activo | tipo_transaccion | cantidad | precio | monto_total | creado_en
    if not connection_pool:
        raise Exception("La conexión a la base de datos no ha sido inicializada")

    try:
        async with connection_pool.acquire() as connection:
            idUsuario = await connection.fetchval("SELECT id_usuario FROM usuarios WHERE nombre_usuario = $1", username)
            query = "INSERT INTO transacciones (id_usuario, simbolo_activo, tipo_transaccion, cantidad, precio, monto_total) VALUES ($1, $2, 'compra', $3, $4, $5)"
            await connection.execute(query, idUsuario, activo, cantidad, precio, cantidad * precio)

    except Exception as e:
        print(f"Error al registrar compra: {e}")
        
async def actualizar_cartera(username: str, activo: str, cantidad: float, precio: float, stopLoss: float, takeProfit: float):
    if not connection_pool:
        raise Exception("La conexión a la base de datos no ha sido inicializada")

    try:
        async with connection_pool.acquire() as connection:
            async with connection.transaction():  # Transacción atómica
                # Obtener ID de usuario
                query = "SELECT id_usuario FROM usuarios WHERE nombre_usuario = $1"
                idUsuario = await connection.fetchval(query, username)
                
                # Buscar registro existente
                query_registro = "SELECT cantidad, precio_promedio_compra FROM cartera WHERE id_usuario = $1 AND simbolo_activo = $2"
                registro_actual = await connection.fetchrow(query_registro, idUsuario, activo)
                
                if registro_actual:
                    # Calcular nuevo promedio ponderado
                    cantidad_actual = registro_actual['cantidad']
                    precio_actual = registro_actual['precio_promedio_compra']
                    
                    nueva_cantidad_total = cantidad_actual + cantidad
                    nuevo_precio_promedio = ((cantidad_actual * precio_actual) +(cantidad * precio)) / nueva_cantidad_total
                    
                    # Actualizar registro existente
                    query_actualizar = "UPDATE cartera SET cantidad = $1, precio_promedio_compra = $2, stop_loss = $3, take_profit = $4 WHERE id_usuario = $5 AND simbolo_activo = $6"
                    await connection.execute(query_actualizar, nueva_cantidad_total, nuevo_precio_promedio, stopLoss, takeProfit, idUsuario, activo)
                else:
                    # Insertar nuevo registro
                    query_insertar = "INSERT INTO cartera (id_usuario, simbolo_activo, cantidad, precio_promedio_compra, stop_loss, take_profit) VALUES ($1, $2, $3, $4, $5, $6)"
                    await connection.execute(query_insertar, idUsuario, activo, cantidad, precio, stopLoss, takeProfit)
                    
    except Exception as e:
        print(f"Error al actualizar cartera: {e}")
        raise
