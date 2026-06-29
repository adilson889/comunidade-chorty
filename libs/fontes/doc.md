
## Fontes (ft)

## Conceito

A biblioteca `fontes` fornece componentes de texto com tipografia avancada. Cada componente aceita atributos como `familia`, `tamanho`, `cor`, `peso`, `alinhar`, `estilo`, `orientacao` e `ajuste`. Todos os atributos sao opcionais e tem valores padrao.

## Instalacao

```chorty
usar biblioteca fontes ft
```

Componentes

ft:titulo

Titulo de primeiro nivel.

```chorty
ft:titulo "Ola Mundo"
ft:titulo "Ola Mundo" familia="inter" tamanho=32 cor="azul" peso="negrito" alinhar="centro"
```

ft:subtitulo

Titulo de segundo nivel.

```chorty
ft:subtitulo "Descricao"
ft:subtitulo "Descricao" familia="serif" tamanho=20 cor="cinza"
```

ft:texto

Paragrafo de texto.

```chorty
ft:texto "Conteudo do paragrafo"
ft:texto "Conteudo" familia="mono" tamanho=14 estilo="italico"
```

ft:badge

Etiqueta estilizada.

```chorty
ft:badge "Novo" cor="branco" fundo="azul"
ft:badge "Promocao" familia="titulo" tamanho=12 cor="branco" fundo="vermelho"
```

ft:botao

Botao com tipografia personalizada.

```chorty
ft:botao "Entrar" familia="inter" tamanho=16 cor="branco" fundo="verde" peso="negrito"
```

ft:entrada

Campo de entrada de texto.

```chorty
ft:entrada placeholder="Email" familia="inter" tamanho=14
```

ft:grupo

Container de agrupamento com tipografia.

```chorty
ft:grupo familia="poppins" tamanho=16 alinhar="centro"
  ft:titulo "Agrupado"
  ft:texto "Conteudo dentro do grupo"
fim
```

ft:secao

Seccao com tipografia e fundo personalizavel.

```chorty
ft:secao familia="inter" tamanho=16 fundo="azul_claro"
  ft:titulo "Seccao Personalizada"
  ft:texto "Com fundo e fonte propria"
fim
```

#. Atributos disponíveis 

| Atributo | Valores | Padrão |
|----------|---------|--------|
| `familia` | `"inter"`, `"poppins"`, `"mono"`, `"serif"`, `"sans"`, `"elegante"`, `"titulo"`, `"manuscrita"`, `"decorativa"`, `"padrao"` | `"padrao"` |
| `tamanho` | numero (px) | `16` |
| `cor` | nome ou hex | `"#1e293b"` |
| `peso` | `"fino"`, `"normal"`, `"medio"`, `"semi_negrito"`, `"negrito"`, `"extra_negrito"` | `"normal"` |
| `alinhar` | `"esquerda"`, `"centro"`, `"direita"`, `"justificado"` | `"esquerda"` |
| `estilo` | `"normal"`, `"italico"`, `"obliquo"` | `"normal"` |
| `orientacao` | `"horizontal"`, `"vertical"`, `"obliquo"` | `"horizontal"` |
| `angulo` | numero (graus) | `0` |
| `ajuste` | `"canto"`, `"centro"`, `"esquerda"`, `"direita"` | `"esquerda"` |
| `fundo` | nome ou hex | transparente |

---

**Fontes disponíveis**

| Valor | Fonte |
|-------|-------|
| `"inter"` | Inter (moderna, limpa) |
| `"poppins"` | Poppins (arredondada) |
| `"mono"` | JetBrains Mono (codigo) |
| `"serif"` | Times New Roman |
| `"sans"` | Arial / System UI |
| `"elegante"` | Playfair Display |
| `"titulo"` | Bebas Neue |
| `"manuscrita"` | Caveat |
| `"decorativa"` | Pacifico |
| `"padrao"` | Fonte do sistema |



Uso completo

```chorty
tela "Home"

  ft:secao familia="inter" tamanho=18 cor="#1e293b" alinhar="centro"

    ft:titulo "Bem-vindo!" familia="titulo" tamanho=32 cor="azul" peso="extra_negrito"

    ft:texto "Esta e uma descricao em italico." familia="inter" tamanho=16 cor="cinza" estilo="italico"

    ft:texto "Codigo fonte em mono." familia="mono" tamanho=14 cor="verde"

    ft:badge "Novo" cor="branco" fundo="azul"

    ft:botao "Entrar" familia="inter" tamanho=16 cor="branco" fundo="verde" peso="negrito"

  fim

fim
```

Resumo

A biblioteca fontes oferece componentes de texto com tipografia avancada. Cada componente e usado com ft:nome e aceita atributos opcionais de estilo. Nao ha scripts, nao ha _aplicar(). Tudo e renderizado diretamente com estilos inline a partir dos templates do manifesto.
