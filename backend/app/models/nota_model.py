from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Nota(Base):
    __tablename__ = "notas"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    texto = Column(Text)
    aprovado = Column(String)
    criado_em = Column(DateTime, default=datetime.utcnow)
