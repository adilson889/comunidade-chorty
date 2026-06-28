import json
import os
import re

PASTA_LIBS = "libs"
FICHEIRO_CATALOGO = "catalogo_libs.json"

def extrair_metadados(caminho):
    try:
        with open(caminho, "r", encoding="utf-8") as f:
            dados = json.load(f)
        return {
            "id": dados.get("id", ""),
            "nome": dados.get("nome", dados.get("id", "")),
            "alias": dados.get("alias", ""),
            "versao": dados.get("versao", "1.0"),
            "autor": dados.get("autor", "desconhecido"),
            "descricao": dados.get("descricao", ""),
            "tamanho": f"{os.path.getsize(caminho) // 1024} KB",
            "url": f"https://raw.githubusercontent.com/adilson889/comunidade-chorty/main/{caminho.replace(chr(92), '/')}"
        }
    except Exception as e:
        print(f"Erro ao ler {caminho}: {e}")
        return None

def gerar():
    catalogo = []
    for raiz, _, ficheiros in os.walk(PASTA_LIBS):
        for f in ficheiros:
            if f.endswith(".chorty-lib"):
                caminho = os.path.join(raiz, f)
                meta = extrair_metadados(caminho)
                if meta:
                    catalogo.append(meta)
    
    catalogo.sort(key=lambda x: x["id"])
    
    with open(FICHEIRO_CATALOGO, "w", encoding="utf-8") as f:
        json.dump(catalogo, f, ensure_ascii=False, indent=2)
    
    print(f"Catalogo gerado: {len(catalogo)} bibliotecas")

if __name__ == "__main__":
    gerar()