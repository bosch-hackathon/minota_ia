from pydantic import BaseModel
from typing import List, Optional


class DadosNota(BaseModel):
valor_total: Optional[str] = None
data_emissao: Optional[str] = None
produtos: List[str] = []


class NotaResponse(BaseModel):
status: str # 'approved' | 'suspicious'
motivos: List[str] = []
dados: DadosNota