def validar_nota(chave: str):
    # Simula aprovação para algumas chaves
    chaves_aceitas = [
        "35250951659614000200650010000179131253051767",
        "11111111111111111111111111111111111111111111",
    ]
    if chave in chaves_aceitas:
        return True
    if chave and len(chave) == 44:
        return True
    return False
