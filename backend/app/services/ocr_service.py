from fastapi import UploadFile
from PIL import Image
import pytesseract
import pdfplumber
import io
import re
from unidecode import unidecode

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

async def extrair_texto(file: UploadFile):
    content = await file.read()

    if file.filename.lower().endswith(".pdf"):
        texto = ""
        with pdfplumber.open(io.BytesIO(content)) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text() or ""
                texto += page_text + "\n"
        texto = unidecode(texto)
        return texto
    else:
        imagem = Image.open(io.BytesIO(content))
        texto = pytesseract.image_to_string(imagem, lang="por+eng")
        texto = unidecode(texto)
        return texto

def extrair_chave(texto: str):
    match = re.search(r"\b\d{44}\b", texto)
    return match.group(0) if match else None

def extrair_campos(texto: str):
    dados = {
        "valor_total": None,
        "data_emissao": None,
        "produtos": []
    }

    # Valor total: tenta pegar qualquer ocorrência de R$ ou TOTAL
    valor_match = re.search(r"(?:TOTAL|R\$)\s*[:|-]?\s*([\d\.,]+)", texto, re.IGNORECASE)
    if valor_match:
        dados["valor_total"] = valor_match.group(1).strip()

    # Data de emissão: DD/MM/AAAA ou AAAA-MM-DD
    data_match = re.search(r"(\d{2}/\d{2}/\d{4}|\d{4}-\d{2}-\d{2})", texto)
    if data_match:
        dados["data_emissao"] = data_match.group(0).strip()

    # Produtos: pegar linhas com palavras-chave
    linhas = texto.splitlines()
    for linha in linhas:
        if any(k in linha.lower() for k in ["produto", "item", "descrição"]):
            dados["produtos"].append(linha.strip())

    return dados
