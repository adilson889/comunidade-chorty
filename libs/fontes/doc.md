## Fontes (ft)

Conceito

A biblioteca fontes permite controlar toda a tipografia da aplicacao — cores, tamanhos, estilos, familias, orientacao, posicao e ajuste. Tudo em portugues puro, com valores semanticos faceis de lembrar.

Instalacao

```chorty
usar biblioteca fontes ft
```

Cores

Define a cor do texto. Aceita nomes semanticos, hexadecimal, RGB e HSL.

Na UI (dois pontos)

```chorty
ft:cor = "azul"
ft:cor = "#2563eb"
ft:cor = "rgb(37,99,235)"
ft:cor = "hsl(221,83%,53%)"
ft:cor = "vermelho"
ft:cor = "verde"
ft:cor = "cinza"
```

Na logica (ponto)

```chorty
ft.cor = "azul"
```

---

Tamanho

Define o tamanho da fonte em pixels ou com valores predefinidos.

Na UI

```chorty
ft:tamanho = 24
ft:tamanho = "grande"
ft:tamanho = "pequeno"
ft:tamanho = "medio"
```

Na logica

```chorty
ft.tamanho = 18
ft.aumentar(2)
ft.diminuir(2)
```

---

Estilo

Define o estilo da fonte.

Na UI

```chorty
ft:estilo = "normal"
ft:estilo = "italico"
ft:estilo = "obliquo"
```

---

Familia

Define a familia tipografica. Inclui fontes Google e fontes do sistema.

Na UI

```chorty
ft:familia = "inter"
ft:familia = "poppins"
ft:familia = "mono"
ft:familia = "serif"
ft:familia = "sans"
ft:familia = "elegante"
ft:familia = "titulo"
ft:familia = "manuscrita"
ft:familia = "decorativa"
ft:familia = "padrao"
```

Fontes disponiveis

Valor Fonte
"inter" Inter (moderna, limpa)
"poppins" Poppins (arredondada)
"mono" JetBrains Mono (codigo)
"serif" Times New Roman
"sans" Arial / System UI
"elegante" Playfair Display
"titulo" Bebas Neue
"manuscrita" Caveat
"decorativa" Pacifico
"padrao" Fonte do sistema

---

Peso

Define a espessura da fonte.

Na UI

```chorty
ft:peso = "fino"
ft:peso = "normal"
ft:peso = "medio"
ft:peso = "semi_negrito"
ft:peso = "negrito"
ft:peso = "extra_negrito"
```

---

Alinhamento

Define o alinhamento horizontal do texto.

Na UI

```chorty
ft:alinhar = "esquerda"
ft:alinhar = "centro"
ft:alinhar = "direita"
ft:alinhar = "justificado"
```

---

Orientacao

Define a direcao do texto.

Na UI

```chorty
ft:orientacao = "horizontal"
ft:orientacao = "vertical"
ft:orientacao = "obliquo"
ft:angulo = 45
ft:angulo = -15
```

Valor Descricao
"horizontal" Texto normal da esquerda para a direita
"vertical" Texto de cima para baixo
"obliquo" Texto inclinado (15 graus por padrao)
ft:angulo = 45 Angulo personalizado em graus

---

Posicao

Define a posicao do elemento de texto dentro do espaco disponivel.

Na UI

```chorty
ft:posicao = "esquerda"
ft:posicao = "centro"
ft:posicao = "direita"
```

---

Ajuste

Define como o texto ocupa o espaco disponivel.

Na UI

```chorty
ft:ajuste = "canto"
ft:ajuste = "centro"
ft:ajuste = "esquerda"
ft:ajuste = "direita"
```

Valor Descricao
"canto" Texto distribuido de canto a canto
"centro" Texto centralizado no espaco
"esquerda" Alinhado a esquerda
"direita" Alinhado a direita

---

Uso completo na tela

```chorty
tela "Home"

  ft:familia = "inter"
  ft:tamanho = 18
  ft:cor = "#1e293b"
  ft:alinhar = "centro"
  ft:peso = "normal"

  cabecalho
    titulo "Minha App"
  fim

  secao espaco=24

    ft:familia = "titulo"
    ft:tamanho = 32
    ft:cor = "azul"
    ft:peso = "extra_negrito"
    titulo "Bem-vindo!"

    ft:familia = "inter"
    ft:tamanho = 16
    ft:cor = "cinza"
    ft:estilo = "italico"
    texto "Esta e uma descricao em italico."

    ft:familia = "mono"
    ft:tamanho = 14
    ft:cor = "verde"
    texto "Codigo fonte em mono."

  fim

fim
```

---

Exemplo com logica

```chorty
logica

dados
  textoImportante: texto = "Aviso!"
  corActual: texto = "vermelho"
fim

funcao destacar()
  ft.cor = corActual
  ft.tamanho = 24
  ft.peso = "negrito"
  ft.alinhar = "centro"
  mensagem(textoImportante)
fim

fim
```

---

Resumo

A biblioteca fontes oferece controlo tipografico completo em portugues. Todas as propriedades podem ser usadas na UI com ft:atributo = valor e na logica com ft.atributo = valor. As funcoes ft.aumentar() e ft.diminuir() permitem ajustes incrementais de tamanho.