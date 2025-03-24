from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from dbHelper import *
from contextlib import asynccontextmanager
from priceConsultor import *

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await init_db()
        yield
    finally:
        await close_db()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/login")
async def login(username: str = Body(...), password: str = Body(...)):
    try:
        login_valido = await validarLogin(username, password)
        if login_valido:
            #Crear el JWT
            return {"message": "Inicio de sesión exitoso", "username": username}
        else:
            raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    except Exception as e:
        print(f"Error en la ruta /login: {e}")
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")


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

@app.get("/datos-pre-transaccion")
async def datos_pre_transaccion(activo: str, username: str):
    try:
        precioActivo = await obtener_valor_actual(activo)
        saldoDisponible = await consultar_saldo_disponible(username)
        return {"precioActivo": precioActivo, "saldoDisponible": saldoDisponible}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/consultar-saldo")
async def consultar_saldo(username: str):
    try:
        saldo = await consultar_saldo_disponible(username)
        return {"saldo": saldo}
    except ValueError as e:
        # Este error se lanzará si no se encuentra el usuario
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        # Para otros errores inesperados
        raise HTTPException(status_code=500, detail=f"Error interno del servidor: {str(e)}")
    
@app.get("/consultar-precio-actual")
def consultar_precio_actual(activo: str):
    try:
        precio = obtener_valor_actual(activo)
        return {"precio": precio}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/comprar-acciones")
async def comprar_acciones(username: str, activo: str, cantidad: float, stopLoss: float, takeProfit: float):
    try:
        precio = await obtener_valor_actual(activo)
        saldo = await consultar_saldo_disponible(username)
        if saldo < cantidad:
            raise HTTPException(status_code=400, detail="Saldo insuficiente")
        await actualizar_saldo(username, cantidad)
        await registrar_compra(username, activo, cantidad, precio)
        await actualizar_cartera(username, activo, cantidad, precio, stopLoss, takeProfit)
        return {"message": "Compra realizada exitosamente"}
    except ValueError as e:
        # Este error se lanzará si no se encuentra el usuario
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        # Para otros errores inesperados
        raise HTTPException(status_code=500, detail=f"Error interno del servidor: {str(e)}")
    
@app.get("/reinicio")
async def reinicio(username: str):
    try:
        await reiniciar(username)
        return {"message": "Cartera reiniciada correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
