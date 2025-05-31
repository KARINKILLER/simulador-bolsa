from fastapi import FastAPI, HTTPException, Body, Request, Depends
from fastapi_utils.tasks import repeat_every
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from contextlib import asynccontextmanager
from dbHelper import *
from priceConsultor import *




@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await init_db()
        # await acciones_automaticas()
        yield
    finally:
        await close_db()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.add_middleware(
    SessionMiddleware, 
    secret_key="tu_clave_secreta_muy_larga_y_compleja",
    session_cookie="session_cookie",
    same_site="lax",
    https_only=False,
)

# @repeat_every(seconds=600) 
# async def acciones_automaticas():
#     # Aquí puedes implementar la lógica para las acciones automáticas
#     print("Ejecutando acciones automáticas...")
#     transacciones = await transacciones_automaticas()
#     ventas_a_realizar = await verificar_ventas_automaticas(transacciones)
#     await realizar_ventas_automaticas(ventas_a_realizar)
#     print("Acciones automáticas completadas.")


async def realizar_ventas_automaticas(ventas_a_realizar):
    for venta in ventas_a_realizar:
        usuario = venta[0]
        activo = venta[1]
        cantidad = venta[2]
        try:
            # Realizar la venta
            await actualizar_saldo(usuario, -cantidad) 
            precio = await obtener_valor_actual(activo)
            await registrar_venta(usuario, activo, float(cantidad), precio)
            await eliminar_acciones(usuario, activo, cantidad)
            print(f"Venta automática realizada para {usuario} de {cantidad} acciones de {activo}.")
        except Exception as e:
            print(f"Error al realizar la venta automática para {usuario} de {cantidad} acciones de {activo}: {e}")



# Dependencia para obtener usuario actual
async def get_current_user(request: Request):
    username = request.session.get("username")
    if not username:
        raise HTTPException(status_code=401, detail="No autenticado")
    return username

# Dependencia para verificar admin
# async def check_admin(username: str = Depends(get_current_user)):
#     if not await es_admin_en_bd(username):  # Implementar esta función en dbHelper
#         raise HTTPException(403, "Requiere privilegios de administrador")
#     return username

# Endpoints de autenticación
@app.post("/login")
async def login(request: Request, username: str = Body(...), password: str = Body(...)):
    try:
        if await validarLogin(username, password):
            request.session["username"] = username
            print(request.session["username"])
            return {"message": "Inicio de sesión exitoso"}
        raise HTTPException(401, "Credenciales incorrectas")
    except Exception as e:
        print(f"Error en login: {e}")
        raise HTTPException(500, e)

@app.post("/logout")
async def logout(request: Request):
    request.session.clear()
    return {"message": "Sesión cerrada"}

@app.get("/session-status")
async def session_status(request: Request):
    print("Sesión actual:", request.session)
    username = request.session.get("username")
    return {
        "authenticated": bool(username),
        "username": username,
        "session_id": request.session.get("_session_id")
    }



@app.post("/register")
async def register(email: str = Body(...), username: str = Body(...), password: str = Body(...)):
    print("Hemos entrado en la función register!!")
    try:
        registrado = await registrarUsuario(email, username, password)
        return {"message": "Usuario registrado correctamente", "username": username}
    except Exception as e:
        print(f"Error en la ruta /register: {e}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")
    
@app.get("/consult")
async def consult(activo: str, periodo: str):
    print("Entramos en el endpoint de consult")
    try:
        datos_activo = obtener_datos_activo(activo, periodo)
        return {"datos": datos_activo}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/datos-pre-transaccion-compra")
async def datos_pre_transaccion(
    activo: str, 
    usuario: str = Depends(get_current_user)
):
    try:
        precio_activo = await obtener_valor_actual(activo)
        saldo_disponible = await consultar_saldo_disponible(usuario)
        return {
            "precioActivo": precio_activo,
            "saldoDisponible": saldo_disponible
        }
    except Exception as e:
        raise HTTPException(500, detail=str(e))

    
@app.get("/consultar-saldo")
async def consultar_saldo(usuario: str = Depends(get_current_user)):
    try:
        return {"saldo": await consultar_saldo_disponible(usuario)}
    except ValueError as e:
        raise HTTPException(404, str(e))
    except Exception as e:
        raise HTTPException(500, str(e))
    
    
@app.get("/consultar-precio-actual")
def consultar_precio_actual(activo: str):
    try:
        precio = obtener_valor_actual(activo)
        return {"precio": precio}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/comprar-acciones")
async def comprar_acciones(activo: str = Body(...), cantidad: float = Body(...), stopLoss: float = Body(0), takeProfit: float = Body(0), usuario: str = Depends(get_current_user)):
    try:
        
        precio = await obtener_valor_actual(activo)
        saldo = await consultar_saldo_disponible(usuario)
        print("Estamos comprando acciones")
        if saldo < cantidad:
            raise HTTPException(400, "Saldo insuficiente")
            
        await actualizar_cartera(usuario, activo, cantidad, precio, stopLoss, takeProfit)
        await actualizar_saldo(usuario, cantidad)
        await registrar_compra(usuario, activo, cantidad, precio)


        return {"message": "Compra realizada exitosamente"}
    except ValueError as e:
        raise HTTPException(404, str(e))
    except Exception as e:
        raise HTTPException(500, f"Error interno: {str(e)}")

    
@app.post("/reinicio")
async def reinicio(usuario: str = Depends(get_current_user)):
    try:
        await reiniciar(usuario)
        return {"message": "Cartera reiniciada correctamente"}
    except Exception as e:
        raise HTTPException(500, str(e))

@app.get("/cargar-activos-perfil")
async def cargar_perfil(usuario: str = Depends(get_current_user)):
    try:
        return await cargarPerfil(usuario)
    except Exception as e:
        raise HTTPException(500, str(e))

@app.get("/cargar-transacciones-perfil")
async def cargar_transacciones_perfil(usuario: str = Depends(get_current_user)):
    try:
        return await cargarTransaccionesPerfil(usuario)
    except Exception as e:
        raise HTTPException(500, str(e))

@app.get("/cargar-todas-transacciones")
async def cargar_todas_transacciones(usuario: str = Depends(get_current_user)):
    try:
        return await cargarTodasLasTransacciones(usuario)
    except Exception as e:
        raise HTTPException(500, str(e))

@app.get("/datos-pre-transaccion-venta")
async def datos_pre_transaccion_venta(
    activo: str, 
    usuario: str = Depends(get_current_user)
):
    try:
        precio_activo = await obtener_valor_actual(activo)
        print("el precio del activo es: "+ str(precio_activo))
        print (type(precio_activo))
        #Consultar cuantas acciones tiene el usuario de este activo y devolver 
        numAcciones = await consultar_cantidad_acciones(usuario, activo)
        print("El numero de acciones es " + str(numAcciones))
        print(type(numAcciones))    
        numAcciones = float(numAcciones)  # Asegurarse de que sea un número flotante
        cantidadDisponible = round(numAcciones * precio_activo, 4)
        print("La multiplicación es el saldo total del activo, que es: " + str(cantidadDisponible))
        return {
            "precioActivo": precio_activo,
            "numAcciones": numAcciones,
            "cantidadDisponible": cantidadDisponible
        }
    except Exception as e:
        raise HTTPException(500, detail=str(e))
    
@app.post("/vender-acciones")
async def vender_acciones(activo: str,cantidad: float,usuario: str = Depends(get_current_user)):
    try:
        precio = await obtener_valor_actual(activo)
        
        if cantidad <= 0:
            raise HTTPException(400, "Cantidad no válida")
            
        # Comprobar si el usuario tiene suficientes acciones para vender
        precio_activo = await obtener_valor_actual(activo)
        #Consultar cuantas acciones tiene el usuario de este activo y devolver 
        numAcciones = await consultar_cantidad_acciones(usuario, activo)
        numAcciones = float(numAcciones)  # Asegurarse de que sea un número flotante
        cantidadDisponible = round(numAcciones * precio_activo, 4)

        if cantidadDisponible < cantidad:
            raise HTTPException(400, "No tienes suficientes acciones para vender")
            
        await actualizar_saldo(usuario, -cantidad)  # Vender implica sumar al saldo
        await registrar_venta(usuario, activo, cantidad, precio)
        await eliminar_acciones(usuario, activo, cantidad)
        
        return {"message": "Venta realizada exitosamente"}
    except ValueError as e:
        raise HTTPException(404, str(e))
    except Exception as e:
        raise HTTPException(500, f"Error interno: {str(e)}")

