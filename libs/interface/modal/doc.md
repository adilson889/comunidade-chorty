
# interface.modal (md)

## Conceito

Sistema de modais elegantes — janelas flutuantes centradas para confirmações, avisos e menus de opções. Leve, rápido e 100% Chorty.

## Exemplo visual

```chorty
md:modal
  ref="confirmar_apagar"
  tipo="normal"
  transicao="surgir"
  destaque="Apagar ficheiro?"
  conteudo="Esta acao nao pode ser desfeita."
  positivo="Apagar"
  negativo="Cancelar"
fim
```

Instalação

```chorty
config
  saida = "app"
  importar elementosUI
  usar biblioteca interface.modal md
fim
```

---

Componente md:modal

Atributos

Atributo Obrigatório Tipo Padrão Descrição
ref sim Texto — Nome único do modal
tipo sim Texto — normal ou opcoes
transicao não Texto "surgir" surgir, salto, deslizar ou instantaneo
destaque não Texto "" Título do modal
conteudo sim (normal) Texto — Mensagem do corpo
positivo não Texto "Sim" Rótulo do botão confirmar
negativo não Texto "Nao" Rótulo do botão cancelar
opcoes sim (opcoes) Texto — Lista separada por vírgulas
cor_fundo não Texto "branco" Cor de fundo da caixa
cor_texto não Texto "preto" Cor do texto do corpo
cor_destaque não Texto "preto" Cor do título
cor_botao_sim não Texto "azul" Cor do botão confirmar
cor_botao_nao não Texto "cinza_claro" Cor do botão cancelar
cor_texto_sim não Texto "branco" Cor do texto do botão confirmar
cor_texto_nao não Texto "cinza_escuro" Cor do texto do botão cancelar
cor_overlay não Texto "rgba(15,23,42,.55)" Cor do overlay de fundo

Cores disponíveis

Nome Cor
branco Branco
azul Azul
azul_claro Azul claro
preto Preto
vermelho Vermelho
verde Verde
amarelo Amarelo
roxo Roxo
cinza Cinza
laranja Laranja
rosa Rosa
ciano Ciano
turquesa Turquesa
indigo Índigo
cinza_claro Cinza claro
cinza_escuro Cinza escuro

---

Tipos de modal

normal — Modal centrado

Modal com overlay escuro. Ideal para confirmações e avisos.

```chorty
md:modal
  ref="sair"
  tipo="normal"
  destaque="Sair da conta"
  conteudo="Tem certeza que deseja sair?"
  positivo="Sair"
  negativo="Cancelar"
fim
```

opcoes — Sheet inferior

Sheet que desliza de baixo com lista de opções. Ideal para menus de ação.

```chorty
md:modal
  ref="menu"
  tipo="opcoes"
  destaque="Escolha uma acao"
  opcoes="Editar, Apagar, Duplicar"
fim
```

---

Transições

Valor Efeito
surgir Fade in suave (padrão)
salto Pequeno bounce ao aparecer
deslizar Desliza de cima
instantaneo Aparece sem animação

---

Customização de cores

```chorty
md:modal
  ref="custom"
  tipo="normal"
  destaque="Modal Personalizado"
  conteudo="Cores customizadas."
  positivo="Confirmar"
  negativo="Voltar"
  cor_fundo="azul_claro"
  cor_destaque="azul"
  cor_botao_sim="verde"
  cor_botao_nao="cinza"
  cor_texto_sim="branco"
  cor_texto_nao="preto"
fim
```

---

Funções

Função Descrição
md.abrir(ref) Abre o modal
md.fechar(ref) Fecha o modal
md.estaAberto(ref) Retorna verdadeiro se o modal estiver aberto

Uso em lógica

```chorty
logica

funcao mostrarConfirmacao()
  md.abrir("modal_apagar")
fim

funcao fecharConfirmacao()
  md.fechar("modal_apagar")
fim

fim
```

---

Exemplos completos

Confirmação antes de sair

```chorty
app "Sair"

config
  saida = "app"
  importar elementosUI
  usar biblioteca interface.modal md
fim

tela "Inicio"

  titulo "Aplicacao"

  md:modal
    ref="modal_sair"
    tipo="normal"
    transicao="salto"
    destaque="Sair da aplicacao?"
    conteudo="Tem certeza que deseja sair?"
    positivo="Sair"
    negativo="Ficar"
  fim

  botao "Sair" tipo="vermelho" acao=sair

fim

logica

funcao sair()
  md.abrir("modal_sair")
fim

fim

fim
```

Menu de opções

```chorty
app "Menu"

config
  saida = "app"
  importar elementosUI
  usar biblioteca interface.modal md
fim

tela "Inicio"

  titulo "Ficheiro"

  md:modal
    ref="menu_acoes"
    tipo="opcoes"
    transicao="surgir"
    destaque="Acoes do ficheiro"
    opcoes="Renomear, Mover, Apagar"
  fim

  botao "Acoes" acao=mostrarMenu

fim

logica

funcao mostrarMenu()
  md.abrir("menu_acoes")
fim

fim

fim
```

Modal com cores customizadas

```chorty
app "Custom"

config
  saida = "app"
  importar elementosUI
  usar biblioteca interface.modal md
fim

tela "Inicio"

  md:modal
    ref="tema"
    tipo="normal"
    destaque="Confirmacao"
    conteudo="Modal com cores personalizadas."
    positivo="Sim"
    negativo="Nao"
    cor_fundo="roxo"
    cor_texto="branco"
    cor_destaque="branco"
    cor_botao_sim="verde"
    cor_botao_nao="cinza_escuro"
  fim

  botao "Abrir" acao=abrir

fim

logica
funcao abrir()
  md.abrir("tema")
fim
fim

fim
```

---

Notas técnicas

· O componente md:modal requer saida = "app" ou saida = "html" (DOM).
· O ref deve ser único na tela.
· Para tipo="opcoes", usar opcoes="Opcao1, Opcao2, Opcao3" separado por vírgulas.
· As cores aceitam os nomes da tabela de cores ou valores CSS diretos.
· As animações usam CSS transition e @keyframes para desempenho nativo.

``` g```markdown
# interface.modal (md)

## Conceito

Sistema de modais elegantes — janelas flutuantes centradas para confirmações, avisos e menus de opções. Leve, rápido e 100% Chorty.

## Exemplo visual

![Modal exemplo](https://via.placeholder.com/600x300/2563eb/white?text=Modal+Exemplo)

```chorty
md:modal
  ref="confirmar_apagar"
  tipo="normal"
  transicao="surgir"
  destaque="Apagar ficheiro?"
  conteudo="Esta acao nao pode ser desfeita."
  positivo="Apagar"
  negativo="Cancelar"
fim
```

Instalação

```chorty
config
  saida = "app"
  importar elementosUI
  usar biblioteca interface.modal md
fim
```

---

Componente md:modal

Atributos

| Atributo | Obrigatório | Tipo | Padrão | Descrição |
| --- | --- | --- | --- | --- |
| `ref` | sim | Texto | — | Nome único do modal |
| `tipo` | sim | Texto | — | `normal` ou `opcoes` |
| `transicao` | não | Texto | `"surgir"` | `surgir`, `salto`, `deslizar` ou `instantaneo` |
| `destaque` | não | Texto | `""` | Título do modal |
| `conteudo` | sim (normal) | Texto | — | Mensagem do corpo |
| `positivo` | não | Texto | `"Sim"` | Rótulo do botão confirmar |
| `negativo` | não | Texto | `"Nao"` | Rótulo do botão cancelar |
| `opcoes` | sim (opcoes) | Texto | — | Lista separada por vírgulas |
| `cor_fundo` | não | Texto | `"branco"` | Cor de fundo da caixa |
| `cor_texto` | não | Texto | `"preto"` | Cor do texto do corpo |
| `cor_destaque` | não | Texto | `"preto"` | Cor do título |
| `cor_botao_sim` | não | Texto | `"azul"` | Cor do botão confirmar |
| `cor_botao_nao` | não | Texto | `"cinza_claro"` | Cor do botão cancelar |
| `cor_texto_sim` | não | Texto | `"branco"` | Cor do texto do botão confirmar |
| `cor_texto_nao` | não | Texto | `"cinza_escuro"` | Cor do texto do botão cancelar |
| `cor_overlay` | não | Texto | `"rgba(15,23,42,.55)"` | Cor do overlay de fundo |

Cores disponíveis

| Nome | Cor |
| --- | --- |
| `branco` | Branco |
| `azul` | Azul |
| `azul_claro` | Azul claro |
| `preto` | Preto |
| `vermelho` | Vermelho |
| `verde` | Verde |
| `amarelo` | Amarelo |
| `roxo` | Roxo |
| `cinza` | Cinza |
| `laranja` | Laranja |
| `rosa` | Rosa |
| `ciano` | Ciano |
| `turquesa` | Turquesa |
| `indigo` | Índigo |
| `cinza_claro` | Cinza claro |
| `cinza_escuro` | Cinza escuro |
---

Tipos de modal

normal — Modal centrado

Modal com overlay escuro. Ideal para confirmações e avisos.

```chorty
md:modal
  ref="sair"
  tipo="normal"
  destaque="Sair da conta"
  conteudo="Tem certeza que deseja sair?"
  positivo="Sair"
  negativo="Cancelar"
fim
```

opcoes — Sheet inferior

Sheet que desliza de baixo com lista de opções. Ideal para menus de ação.

```chorty
md:modal
  ref="menu"
  tipo="opcoes"
  destaque="Escolha uma acao"
  opcoes="Editar, Apagar, Duplicar"
fim
```

---

Transições

Valor Efeito
surgir Fade in suave (padrão)
salto Pequeno bounce ao aparecer
deslizar Desliza de cima
instantaneo Aparece sem animação

---

Customização de cores

```chorty
md:modal
  ref="custom"
  tipo="normal"
  destaque="Modal Personalizado"
  conteudo="Cores customizadas."
  positivo="Confirmar"
  negativo="Voltar"
  cor_fundo="azul_claro"
  cor_destaque="azul"
  cor_botao_sim="verde"
  cor_botao_nao="cinza"
  cor_texto_sim="branco"
  cor_texto_nao="preto"
fim
```

---

Funções

Função Descrição
md.abrir(ref) Abre o modal
md.fechar(ref) Fecha o modal
md.estaAberto(ref) Retorna verdadeiro se o modal estiver aberto

Uso em lógica

```chorty
logica

funcao mostrarConfirmacao()
  md.abrir("modal_apagar")
fim

funcao fecharConfirmacao()
  md.fechar("modal_apagar")
fim

fim
```

---

Exemplos completos

Confirmação antes de sair

```chorty
app "Sair"

config
  saida = "app"
  importar elementosUI
  usar biblioteca interface.modal md
fim

tela "Inicio"

  titulo "Aplicacao"

  md:modal
    ref="modal_sair"
    tipo="normal"
    transicao="salto"
    destaque="Sair da aplicacao?"
    conteudo="Tem certeza que deseja sair?"
    positivo="Sair"
    negativo="Ficar"
  fim

  botao "Sair" tipo="vermelho" acao=sair

fim

logica

funcao sair()
  md.abrir("modal_sair")
fim

fim

fim
```

Menu de opções

```chorty
app "Menu"

config
  saida = "app"
  importar elementosUI
  usar biblioteca interface.modal md
fim

tela "Inicio"

  titulo "Ficheiro"

  md:modal
    ref="menu_acoes"
    tipo="opcoes"
    transicao="surgir"
    destaque="Acoes do ficheiro"
    opcoes="Renomear, Mover, Apagar"
  fim

  botao "Acoes" acao=mostrarMenu

fim

logica

funcao mostrarMenu()
  md.abrir("menu_acoes")
fim

fim

fim
```

Modal com cores customizadas

```chorty
app "Custom"

config
  saida = "app"
  importar elementosUI
  usar biblioteca interface.modal md
fim

tela "Inicio"

  md:modal
    ref="tema"
    tipo="normal"
    destaque="Confirmacao"
    conteudo="Modal com cores personalizadas."
    positivo="Sim"
    negativo="Nao"
    cor_fundo="roxo"
    cor_texto="branco"
    cor_destaque="branco"
    cor_botao_sim="verde"
    cor_botao_nao="cinza_escuro"
  fim

  botao "Abrir" acao=abrir

fim

logica
funcao abrir()
  md.abrir("tema")
fim
fim

fim
```

---

Notas técnicas

· O componente md:modal requer saida = "app" ou saida = "html" (DOM).
· O ref deve ser único na tela.
· Para tipo="opcoes", usar opcoes="Opcao1, Opcao2, Opcao3" separado por vírgulas.
· As cores aceitam os nomes da tabela de cores ou valores CSS diretos.
· As animações usam CSS transition e @keyframes para desempenho nativo.