from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from dbHelper import *
from contextlib import asynccontextmanager


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
    