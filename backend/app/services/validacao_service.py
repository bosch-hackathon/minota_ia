def validar_campos(texto: str):
    """
    Validar CNPJ, datas e valores.
    Aqui você pode usar regex para extrair os campos da nota.
    """
    # Exemplo simples:
    import re
    cnpjs = re.findall(r'\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}', texto)
    return {"cnpjs_encontrados": cnpjs}

def aplicar_politica(texto: str):
    """
    Detecta produtos proibidos (álcool, cigarro, casas de prazer)
    """
    proibidos = ["cerveja", "vodka", "cigarro", "stripper", "casa de prazer"]
    encontrados = [p for p in proibidos if p.lower() in texto.lower()]
    return {"proibidos_encontrados": encontrados, "aprovado": len(encontrados) == 0}
