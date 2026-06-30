
## Fontes (ft)

## Conceito

A biblioteca `fontes` fornece componentes de texto com tipografia avançada. Cada componente aceita atributos como `familia`, `tamanho`, `cor`, `peso`, `alinhar`, `estilo` e `fundo`. Todos os atributos são opcionais e têm valores padrão. Os estilos são resolvidos directamente via classes CSS — não há scripts nem processamento dinâmico.

## Instalação

```chorty
usar biblioteca fontes ft
```

## Forma de uso

Os atributos do componente vão um por linha, indentados, terminando sempre com `conteudo="..."` — não há `fim` a fechar o elemento de biblioteca.

```chorty
ft:titulo
  tamanho=32
  familia="inter"
  cor="azul"
  conteudo="Biblioteca Fontes!"
```

Também podes escrever tudo na mesma linha:

```chorty
ft:badge conteudo="Novo" cor="branco" fundo="azul"
```

## Componentes

### ft:titulo

Título de primeiro nível.

```chorty
ft:titulo conteudo="Olá Mundo"

ft:titulo
  familia="inter"
  tamanho=32
  cor="azul"
  peso="negrito"
  alinhar="centro"
  conteudo="Olá Mundo"
```

### ft:subtitulo

Título de segundo nível.

```chorty
ft:subtitulo conteudo="Descrição"

ft:subtitulo
  familia="serif"
  tamanho=20
  cor="cinza"
  conteudo="Descrição"
```

### ft:texto

Parágrafo de texto.

```chorty
ft:texto conteudo="Conteúdo do parágrafo"

ft:texto
  familia="mono"
  tamanho=14
  estilo="italico"
  conteudo="Conteúdo"
```

### ft:badge

Etiqueta estilizada.

```chorty
ft:badge conteudo="Novo" cor="branco" fundo="azul"

ft:badge
  familia="titulo"
  tamanho=12
  cor="branco"
  fundo="vermelho"
  conteudo="Promoção"
```

### ft:botao

Botão com tipografia personalizada.

```chorty
ft:botao
  familia="inter"
  tamanho=16
  cor="branco"
  fundo="verde"
  peso="negrito"
  conteudo="Entrar"
```

### ft:entrada

Campo de entrada de texto.

```chorty
ft:entrada
  familia="inter"
  tamanho=14
  placeholder="Email"
```

### ft:grupo

Container de agrupamento com tipografia.

```chorty
ft:grupo
  familia="poppins"
  tamanho=16
  alinhar="centro"
  conteudo="Agrupado"
```

### ft:secao

Secção com tipografia e fundo personalizável.

```chorty
ft:secao
  familia="inter"
  tamanho=16
  fundo="azul_claro"
  conteudo="Secção Personalizada"
```

## Atributos disponíveis

| Atributo | Valores | Padrão |
|----------|---------|--------|
| `familia` | `"inter"`, `"poppins"`, `"mono"`, `"serif"`, `"sans"`, `"elegante"`, `"titulo"`, `"manuscrita"`, `"decorativa"`, `"padrao"` | `"padrao"` |
| `tamanho` | número (px) | `16` |
| `cor` | `"azul"`, `"verde"`, `"vermelho"`, `"amarelo"`, `"roxo"`, `"cinza"`, `"preto"`, `"branco"` | sem cor definida |
| `peso` | `"fino"`, `"normal"`, `"medio"`, `"semi_negrito"`, `"negrito"`, `"extra_negrito"` | `"normal"` |
| `alinhar` | `"esquerda"`, `"centro"`, `"direita"`, `"justificado"` | `"esquerda"` |
| `estilo` | `"normal"`, `"italico"`, `"obliquo"` | `"normal"` |
| `fundo` | `"azul"`, `"verde"`, `"vermelho"`, `"amarelo"`, `"roxo"`, `"cinza"`, `"preto"`, `"branco"`, `"azul_claro"`, `"transparente"` | `"transparente"` |
| `conteudo` | texto | obrigatório |

> Nota: `cor` e `fundo` aceitam apenas os nomes listados acima — são resolvidos por classes CSS fixas, não por código de cor livre (hex).

---

**Fontes disponíveis**

| Valor | Fonte |
|-------|-------|
| `"inter"` | Inter (moderna, limpa) |
| `"poppins"` | Poppins (arredondada) |
| `"mono"` | JetBrains Mono (código) |
| `"serif"` | Times New Roman |
| `"sans"` | Arial / System UI |
| `"elegante"` | Playfair Display |
| `"titulo"` | Bebas Neue |
| `"manuscrita"` | Caveat |
| `"decorativa"` | Pacifico |
| `"padrao"` | Fonte do sistema |

---

## Uso completo

```chorty
app "Teste Fontes"

config
  saida = "app"
  importar elementosUI
  importar reatividade
  usar biblioteca fontes ft
fim

tela "Home"

  ft:titulo
    tamanho=32
    familia="inter"
    cor="azul"
    conteudo="Biblioteca Fontes!"

  ft:texto
    tamanho=16
    conteudo="A funcionar corretamente."

  ft:badge conteudo="Novo" cor="branco" fundo="azul"

fim

fim
```

## Resumo

A biblioteca `fontes` oferece componentes de texto com tipografia avançada. Cada componente é usado com `ft:nome`, seguido dos atributos indentados em linhas separadas (ou tudo numa só linha) e termina sempre com `conteudo="..."`. Não há `scripts` nem `_aplicar()` — tudo é renderizado através de classes CSS fixas resolvidas directamente no template do manifesto.
