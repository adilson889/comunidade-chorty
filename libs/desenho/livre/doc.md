# desenho.livre (dl)

## Conceito

Tartaruga gráfica inspirada no módulo turtle do Python. Controla uma caneta que se move num canvas, desenhando linhas, círculos, estrelas e formas geométricas. Biblioteca nativa — sempre disponível.

## Métodos

- `dl.iniciar()` — abre o canvas de desenho
- `dl.avancar(distancia)` — move a caneta para a frente desenhando
- `dl.recuar(distancia)` — move a caneta para trás desenhando
- `dl.girar(graus)` — gira a caneta para a direita
- `dl.esquerda(graus)` — gira a caneta para a esquerda
- `dl.cor(nome)` — muda a cor da caneta
- `dl.levantar()` — levanta a caneta, move sem desenhar
- `dl.baixar()` — baixa a caneta, volta a desenhar
- `dl.limpar()` — limpa o canvas e reposiciona no centro
- `dl.fechar()` — fecha o canvas
- `dl.circulo(raio)` — desenha um círculo
- `dl.estrela(pontas, tamanho)` — desenha uma estrela
- `dl.posicao()` — retorna a posição atual `{x, y, angulo}`

## Cores disponíveis

`azul`, `verde`, `vermelho`, `amarelo`, `roxo`, `laranja`, `rosa`, `ciano`, `preto`, `branco`, `cinza`

## Exemplos

### Quadrado

```chorty
usar biblioteca desenho.livre dl

dl.iniciar()
dl.avancar(100)
dl.girar(90)
dl.avancar(100)
dl.girar(90)
dl.avancar(100)
dl.girar(90)
dl.avancar(100)