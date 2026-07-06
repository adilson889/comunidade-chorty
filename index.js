// ─────────────────────────────────────────────────────────────────────────────
// Mini API Chorty — hospedada na Vercel
// Endpoints (tudo neste unico ficheiro, roteado por ?action=):
//   POST /?action=publicar   { titulo, descricao, autor, autor_id, codigo, saida, versao }
//   POST /?action=estrela    { id }
//   POST /?action=fork       { id }
//   GET  /?action=perfil     ?autor_id=...
//
// Variaveis de ambiente necessarias na Vercel:
//   GITHUB_TOKEN  - token com permissao de escrita no repo comunidade-chorty
//   GITHUB_OWNER  - ex: adilson889
//   GITHUB_REPO   - ex: comunidade-chorty
//   GITHUB_BRANCH - ex: main
// ─────────────────────────────────────────────────────────────────────────────

const GITHUB_TOKEN  = process.env.GITHUB_TOKEN;
const GITHUB_OWNER  = process.env.GITHUB_OWNER;
const GITHUB_REPO   = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";

const CATALOGO_PATH = "catalogo_projetos.json";
const PASTA_PROJETOS = "projetos";

const API_BASE = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;

// ── utilitarios GitHub ──────────────────────────────────────────────────────
async function githubGet(caminho) {
    const resposta = await fetch(`${API_BASE}/contents/${caminho}?ref=${GITHUB_BRANCH}`, {
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github+json"
        }
    });
    if (resposta.status === 404) return null;
    if (!resposta.ok) throw new Error(`GitHub GET falhou: ${resposta.status}`);
    const dados = await resposta.json();
    const conteudo = Buffer.from(dados.content, "base64").toString("utf-8");
    return { conteudo, sha: dados.sha };
}

async function githubPut(caminho, conteudoTexto, mensagem, sha) {
    const corpo = {
        message: mensagem,
        content: Buffer.from(conteudoTexto, "utf-8").toString("base64"),
        branch: GITHUB_BRANCH
    };
    if (sha) corpo.sha = sha;

    const resposta = await fetch(`${API_BASE}/contents/${caminho}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github+json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(corpo)
    });
    if (!resposta.ok) {
        const erro = await resposta.text();
        throw new Error(`GitHub PUT falhou: ${resposta.status} ${erro}`);
    }
    return resposta.json();
}

// ── slug (mesma logica do gerar_catalogo.py) ────────────────────────────────
function slugificar(texto) {
    const semAcentos = String(texto)
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "");
    let slug = semAcentos.toLowerCase().trim();
    slug = slug.replace(/[^a-z0-9]+/g, "-");
    slug = slug.replace(/-+/g, "-").replace(/^-|-$/g, "");
    return slug || "projeto";
}

// ── catalogo ─────────────────────────────────────────────────────────────────
async function lerCatalogo() {
    const resultado = await githubGet(CATALOGO_PATH);
    if (!resultado) return { lista: [], sha: null };
    try {
        return { lista: JSON.parse(resultado.conteudo), sha: resultado.sha };
    } catch (e) {
        return { lista: [], sha: resultado.sha };
    }
}

async function guardarCatalogo(lista, sha, mensagem) {
    lista.sort((a, b) => String(a.id).localeCompare(String(b.id)));
    const json = JSON.stringify(lista, null, 2);
    return githubPut(CATALOGO_PATH, json, mensagem, sha);
}

// ── acoes ────────────────────────────────────────────────────────────────────
async function acaoPublicar(body) {
    const { titulo, descricao, autor, autor_id, codigo, saida, versao } = body;

    if (!titulo || !autor || !autor_id || !codigo) {
        throw new Error("Campos obrigatorios em falta: titulo, autor, autor_id, codigo.");
    }

    const id = slugificar(titulo);
    const caminhoFicheiro = `${PASTA_PROJETOS}/${id}.chorty`;

    const existente = await githubGet(caminhoFicheiro);
    if (existente) {
        throw new Error(`Ja existe um projeto publicado com o id '${id}'.`);
    }

    const metaLinha = "## " + JSON.stringify({
        id,
        nome: titulo,
        autor,
        autor_id,
        descricao: descricao || "",
        saida: saida || "console",
        versao: versao || "1.0"
    });
    const conteudoFicheiro = `${metaLinha}\n${codigo}`;

    await githubPut(caminhoFicheiro, conteudoFicheiro, `Publica projeto: ${titulo}`, null);

    const { lista, sha } = await lerCatalogo();
    const tamanhoKb = Math.max(1, Math.round(Buffer.byteLength(conteudoFicheiro, "utf-8") / 1024));

    const entrada = {
        id,
        nome: titulo,
        autor,
        autor_id,
        descricao: descricao || "",
        saida: saida || "console",
        versao: versao || "1.0",
        tamanho: `${tamanhoKb} KB`,
        url: `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${caminhoFicheiro}`,
        estrelas: 0,
        forks: 0
    };

    lista.push(entrada);
    await guardarCatalogo(lista, sha, `Atualiza catalogo: adiciona ${id}`);

    return entrada;
}

async function acaoEstrela(body) {
    const { id } = body;
    if (!id) throw new Error("Campo obrigatorio em falta: id.");

    const { lista, sha } = await lerCatalogo();
    const projeto = lista.find((p) => p.id === id);
    if (!projeto) throw new Error(`Projeto '${id}' nao encontrado no catalogo.`);

    projeto.estrelas = (projeto.estrelas || 0) + 1;
    await guardarCatalogo(lista, sha, `Estrela: ${id}`);

    return { id, estrelas: projeto.estrelas };
}

async function acaoFork(body) {
    const { id } = body;
    if (!id) throw new Error("Campo obrigatorio em falta: id.");

    const { lista, sha } = await lerCatalogo();
    const projeto = lista.find((p) => p.id === id);
    if (!projeto) throw new Error(`Projeto '${id}' nao encontrado no catalogo.`);

    projeto.forks = (projeto.forks || 0) + 1;
    await guardarCatalogo(lista, sha, `Fork: ${id}`);

    return { id, forks: projeto.forks };
}

async function acaoPerfil(query) {
    const autorId = query.autor_id;
    if (!autorId) throw new Error("Parametro obrigatorio em falta: autor_id.");

    const { lista } = await lerCatalogo();
    const projetos = lista.filter((p) => p.autor_id === autorId);

    const totalEstrelas = projetos.reduce((soma, p) => soma + (p.estrelas || 0), 0);
    const totalForks = projetos.reduce((soma, p) => soma + (p.forks || 0), 0);

    return {
        projetos,
        total_projetos: projetos.length,
        total_estrelas: totalEstrelas,
        total_forks: totalForks
    };
}

// ── handler principal (Vercel) ──────────────────────────────────────────────
module.exports = async function handler(req, res) {
    const acao = req.query.action;

    try {
        if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
            throw new Error("Configuracao do servidor incompleta.");
        }

        if (acao === "publicar" && req.method === "POST") {
            const resultado = await acaoPublicar(req.body || {});
            return res.status(200).json({ sucesso: true, projeto: resultado });
        }

        if (acao === "estrela" && req.method === "POST") {
            const resultado = await acaoEstrela(req.body || {});
            return res.status(200).json({ sucesso: true, ...resultado });
        }

        if (acao === "fork" && req.method === "POST") {
            const resultado = await acaoFork(req.body || {});
            return res.status(200).json({ sucesso: true, ...resultado });
        }

        if (acao === "perfil" && req.method === "GET") {
            const resultado = await acaoPerfil(req.query);
            return res.status(200).json({ sucesso: true, ...resultado });
        }

        return res.status(400).json({ sucesso: false, erro: "Acao ou metodo invalido." });
    } catch (e) {
        return res.status(500).json({ sucesso: false, erro: e.message });
    }
};