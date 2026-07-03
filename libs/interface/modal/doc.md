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

## Instalação

```chorty
config
  saida = "app"
  importar elementosUI
  usar biblioteca interface.modal md
fim
```

## Componente md:modal

## Atributos

| Atributo | Obrigatório | Tipo | Padrão | Descrição |
| --- | --- | --- | --- | --- |
| `ref` | sim | Texto | — | Nome único do modal |
| `tipo` | sim | Texto | — | `normal` ou `opcoes` |
| `transicao` | não | Texto | `"surgir"` | `surgir`, `salto`, `deslizar` ou `instantaneo` |
| `destaque` | não | Texto | `""` | Título do modal |
| `conteudo` | sim (normal) | Texto | — | Mensagem do corpo |
| `positivo` | não | Texto | `"Sim"` | Rótulo do botão confirmar |
| `negativo` | não | Texto | `"Nao"` | Rótulo do botão cancelar |

## Tipo normal

Modal centrado com overlay escuro. Ideal para confirmações e avisos.

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

## Tipo opcoes

Sheet que desliza de baixo com lista de opções. Ideal para menus de ação.

```chorty
md:modal
  ref="menu"
  tipo="opcoes"
  destaque="Escolha uma acao"
  opcao "Editar"
  opcao "Apagar"
  opcao "Duplicar"
fim
```

## Transições

| Valor | Efeito |
| --- | --- |
| `surgir` | Fade in suave (padrão) |
| `salto` | Pequeno bounce ao aparecer |
| `deslizar` | Desliza de cima (normal) ou de baixo (opcoes) |
| `instantaneo` | Aparece sem animação |

## Funções

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

# Exemplos completos

## Confirmação antes de sair

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

## Menu de opções

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
    opcao "Renomear"
    opcao "Mover"
    opcao "Apagar"
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

## Notas técnicas

· O componente md:modal requer saida = "app" ou saida = "html" (DOM).
· O ref deve ser único na tela. Dois modais com o mesmo ref causam conflito.
· Para tipo="opcoes", cada opcao "texto" é uma linha clicável.
· As animações usam CSS transition para desempenho nativo.
