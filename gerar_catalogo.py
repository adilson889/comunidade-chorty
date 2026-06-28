import json
import os

PASTA_LIBS = "libs"
FICHEIRO_CATALOGO = "catalogo_libs.json"
BASE_URL = "https://raw.githubusercontent.com/adilson889/comunidade-chorty/main"

def extrair_metadados(caminho, raiz):
    try:
        with open(caminho, "r", encoding="utf-8") as f:
            dados = json.load(f)
        lib_id = dados.get("id", "")
        pasta_url = raiz.replace(os.sep, "/")
        return {
            "id": lib_id,
            "nome": dados.get("nome", lib_id),
            "alias": dados.get("alias", ""),
            "versao": dados.get("versao", "1.0"),
            "autor": dados.get("autor", "desconhecido"),
            "descricao": dados.get("descricao", ""),
            "tamanho": f"{os.path.getsize(caminho) // 1024} KB",
            "url": f"{BASE_URL}/{caminho.replace(os.sep, '/')}",
            "docs": f"{BASE_URL}/{pasta_url}/doc.md"
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
                meta = extrair_metadados(caminho, raiz)
                if meta:
                    catalogo.append(meta)
    
    catalogo.sort(key=lambda x: x["id"])
    
    with open(FICHEIRO_CATALOGO, "w", encoding="utf-8") as f:
        json.dump(catalogo, f, ensure_ascii=False, indent=2)
    
    print(f"Catalogo gerado: {len(catalogo)} bibliotecas")

if __name__ == "__main__":
    gerar()