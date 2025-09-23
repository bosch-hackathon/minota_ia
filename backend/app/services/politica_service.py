from unidecode import unidecode

def verificar(dados: dict):
    # Produtos proibidos
    proibidos = ["alcool", "cerveja", "cigarro", "tabaco"]
    motivos = []

    for p in dados.get("produtos", []):
        for termo in proibidos:
            if termo.lower() in unidecode(p.lower()):
                motivos.append(f"Produto proibido: {p}")
    
    # Exemplo: verificar valor máximo (opcional)
    try:
        if dados.get("valor_total"):
            valor_str = dados["valor_total"].replace(".", "").replace(",", ".")
            if float(valor_str) > 1000:  # limite de exemplo
                motivos.append("Valor total acima do limite permitido")
    except:
        pass

    return {
        "ok": len(motivos) == 0,
        "motivos": motivos
    }
