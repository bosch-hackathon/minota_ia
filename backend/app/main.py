from fastapi import FastAPI
from app.routes import notas
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Hackathon Bosch - OCR Notas Fiscais")

app.include_router(notas.router, prefix="/notas", tags=["Notas"])
# app/main.py


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # desenvolvimento: aceita qualquer origem
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
