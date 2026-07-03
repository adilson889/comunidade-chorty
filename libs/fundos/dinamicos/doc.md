
# fundos.dinamicos (fd)

## Conceito

Fundo animado com canvas que transforma o fundo da tela com animações suaves — estrelas cintilantes, partículas flutuantes conectadas ou ondas relaxantes.

O fundo ocupa toda a tela atrás do conteúdo, sem interferir na interação do utilizador. Cada tipo de fundo tem o seu próprio carácter visual, ideal para dashboards, jogos, apresentações ou simplesmente dar vida à interface.

## Exemplo visual

```chorty
fd:fundo tipo="particulas" cor1="azul" cor2="ciano" velocidade="1.5" densidade="60"
```

## Instalação

No bloco config do seu programa:

```chorty
config
  saida = "app"
  importar elementosUI
  usar biblioteca fundos.dinamicos fd
fim
```

## Uso

O componente fd:fundo é colocado dentro de uma tela e os seus atributos definem o tipo de animação e o estilo visual. Não tem fim — é um elemento de linha única.

```chorty
tela "Inicio"
  fd:fundo tipo="estrelas"
  titulo "Bem-vindo!"
fim
```

## Atributos

Atributo Obrigatório Tipo Padrão Descrição
tipo não Texto "estrelas" Tipo de animação: estrelas, particulas ou ondas
cor1 não Texto "branco" Cor principal (estrelas, partículas, linhas das ondas)
cor2 não Texto "azul_claro" Cor secundária (conexões entre partículas)
velocidade não Número 1 Velocidade da animação (0.5 = lento, 2 = rápido)
densidade não Número 50 Quantidade de elementos no fundo

## Cores disponíveis

| Nome | Cor |
|---|---|
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
# Tipos de fundo

## estrelas

Céu estrelado com brilho pulsante. Cada estrela tem intensidade variável, criando um efeito de cintilação natural.

```chorty
fd:fundo tipo="estrelas" cor1="branco" densidade="100"
```

## particulas

Partículas flutuantes com linhas de conexão entre as mais próximas. As partículas movem-se livremente e as conexões criam uma rede dinâmica.

```chorty
fd:fundo tipo="particulas" cor1="azul" cor2="ciano" velocidade="2" densidade="40"
```

## ondas

Ondas horizontais suaves que atravessam o ecrã. Ideal para ambientes calmos e relaxantes.

```chorty
fd:fundo tipo="ondas" cor1="verde" velocidade="0.5"
```

# Exemplos

Dashboard com fundo de partículas

```chorty
app "Painel"

config
  saida = "app"
  importar elementosUI
  usar biblioteca fundos.dinamicos fd
fim

tela "Painel"
  fd:fundo tipo="particulas" cor1="azul" cor2="azul_claro" velocidade="1" densidade="50"

  cabecalho
    titulo "Painel de Controlo"
  fim

  secao
    titulo "Estatisticas"
    texto "Bem-vindo ao seu painel."
  fim
fim

fim
```

## Fundo de estrelas simples

```chorty
fd:fundo tipo="estrelas"
```

## Fundo de ondas verdes

```chorty
fd:fundo tipo="ondas" cor1="verde" velocidade="0.8"
```

Notas técnicas

· O componente fd:fundo requer uma aplicação gráfica (saida = "app", pois depende de Canvas e DOM.
· O canvas é inserido como primeiro elemento do <body>, atrás de todo o conteúdo (z-index: -1).
· Apenas um fundo pode estar ativo por vez. Chamar fd:fundo novamente substitui o anterior.
· Em modo script (console puro), este componente não tem efeito visual.
· As cores são definidas por nomes Chorty (azul, branco), não por códigos hexadecimais.
· A animação usa requestAnimationFrame para desempenho suave.