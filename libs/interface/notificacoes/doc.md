
# interface.notificacoes (in)

## Conceito

Sistema de notificações visuais rápidas (Toast). Aparece e some sem bloquear a aplicação. Usada de dentro da `logica`, disparada por ações do utilizador — não é um elemento estático da `tela`.

## Instalação

```chorty
config
  saida = "app"
  importar elementosUI
  usar biblioteca interface.notificacoes in
fim
```

## Uso

`in.notificar(mensagem, tipo, duracao, posicao)` — chamada dentro de qualquer `funcao`, tipicamente a partir de `acao=` num botão.

```chorty
funcao guardar()
  in.notificar("Dados guardados com sucesso!", "sucesso")
fim
```

## Parâmetros

| Parâmetro | Posição | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---|---|---|---|
| `mensagem` | 1º | sim | Texto | — | A mensagem exibida |
| `tipo` | 2º | não | Texto | `"info"` | `sucesso`, `erro`, `aviso` ou `info` |
| `duracao` | 3º | não | Número | `3000` | Milissegundos antes de sumir |
| `posicao` | 4º | não | Texto | `"baixo"` | `"baixo"` ou `"centro"` |

## Tipos

| Tipo | Cor |
|---|---|
| `sucesso` | Verde |
| `erro` | Vermelho |
| `aviso` | Amarelo |
| `info` | Azul |

## Exemplos

```chorty
funcao aoClicarSalvar()
  in.notificar("Olá, mundo!")
fim

funcao aoRegistar()
  in.notificar("Conta criada com sucesso!", "sucesso")
fim

funcao aoFalharLigacao()
  in.notificar("Falha na conexão. Tente novamente.", "erro", 5000)
fim

funcao aoExpirarSessao()
  in.notificar("Atenção! Sessão vai expirar.", "aviso", 3000, "centro")
fim
```

## Notas técnicas

- Requer `saida = "app"` (depende de DOM e CSS).
- Não é um elemento de `tela` — não usa `in:notificar` com dois pontos. É sempre `in.notificar(...)` dentro de `logica`.
- Notificações são empilhadas: a anterior desaparece antes da próxima surgir.