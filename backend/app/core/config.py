
import os
import platform
from decimal import Decimal


# Caminho padrão do Tesseract (pode ser sobrescrito por variável de ambiente)
TESSERACT_CMD = os.getenv(
"TESSERACT_CMD",
r"C:\\Program Files\\Tesseract-OCR\\tesseract.exe" if platform.system() == "Windows" else "/usr/bin/tesseract",
)


# Valor máximo (configurável) acima do qual a nota é considerada suspeita
# Use formato com ponto decimal: ex: 5000.00
MAX_APPROVAL_VALUE = Decimal(os.getenv("MAX_APPROVAL_VALUE", "5000.00"))


# Lista inicial de termos proibidos (pode ser estendida)
PROIBIDOS = ["alcool", "cerveja", "cigarro", "tabaco"]