import json
import os

PASTA_PROJETOS = "projetos"
FICHEIRO_CATALOGO = "catalogo_projetos.json"
BASE_URL = "https://raw.githubusercontent.com/adilson889/comunidade-chorty/main"

def extrair_metadados(caminho):
    try:
        with open(caminho, "r", encoding="utf-8") as f:
            conteudo = f.read()

        # metadados no topo do ficheiro como bloco de comentario JSON
        # ex: ## {"id":"meu-app","nome":"Meu App","autor":"adilson","descricao":"..."}
        meta = {}
        for linha in conteudo.splitlines():
            if linha.startswith("## {"):
                try:
                    meta = json.loads(linha[3:].strip())
                except Exception:
                    pass
                break

        nome_ficheiro = os.path.basename(caminho)
        projeto_id = meta.get("id", nome_ficheiro.replace(".chorty", ""))

        return {
            "id": projeto_id,
            "nome": meta.get("nome", projeto_id),
            "autor": meta.get("autor", "desconhecido"),
            "descricao": meta.get("descricao", ""),
            "saida": meta.get("saida", "console"),
            "versao": meta.get("versao", "1.0"),
            "tamanho": f"{os.path.getsize(caminho) // 1024} KB",
            "url": f"{BASE_URL}/{caminho.replace(os.sep, '/')}"
        }
    except Exception as e:
        print(f"Erro ao ler {caminho}: {e}")
        return None

def gerar():
    catalogo = []
    for raiz, _, ficheiros in os.walk(PASTA_PROJETOS):
        for f in ficheiros:
            if f.endswith(".chorty"):
                caminho = os.path.join(raiz, f)
                meta = extrair_metadados(caminho)
                if meta:
                    catalogo.append(meta)

    catalogo.sort(key=lambda x: x["id"])

    with open(FICHEIRO_CATALOGO, "w", encoding="utf-8") as f:
        json.dump(catalogo, f, ensure_ascii=False, indent=2)

    print(f"Catalogo gerado: {len(catalogo)} projetos")

if __name__ == "__main__":
    gerar()
