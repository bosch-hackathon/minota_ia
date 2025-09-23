from fastapi import APIRouter, UploadFile, File
from app.services import ocr_service, sefaz_service, politica_service

router = APIRouter()

@router.post("/upload")
async def upload_nota(file: UploadFile = File(...)):
    # 1️⃣ Extrair texto com OCR
    texto = await ocr_service.extrair_texto(file)

    # 2️⃣ Extrair chave NF-e (opcional)
    chave = ocr_service.extrair_chave(texto)

    # 3️⃣ Validar nota na SEFAZ
    nota_valida = sefaz_service.validar_nota(chave)
    motivos = []
    if not nota_valida:
        motivos.append("Nota inválida ou não encontrada na SEFAZ")

    # 4️⃣ Extrair campos relevantes
    dados = ocr_service.extrair_campos(texto)

    # 5️⃣ Validar política da empresa
    politica = politica_service.verificar(dados)
    if politica["motivos"]:
        motivos.extend(politica["motivos"])

    # 6️⃣ Definir status final
    status_final = "approved" if nota_valida and politica["ok"] else "suspicious"

    return {
        "status": status_final,
        "motivos": motivos,
        "dados": dados
    }
