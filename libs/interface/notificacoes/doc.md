
# interface.notificacoes (in)

## Conceito

Sistema de notificações visuais rápidas (Toast). Aparece e some sem bloquear a aplicação.

A notificação é uma mensagem flutuante que surge na tela para dar feedback imediato ao utilizador. Pode ser usada para sucesso, erros, avisos ou informações gerais.

## xemplo visual:
```
in:notificar
tipo="sucesso"
conteudo="Dados guardados com sucesso!"
fim

```

## Instalação

No bloco `config` do seu programa (obrigatório para uso da UI):

```chorty
config
  saida = "app"
  importar elementosUI
  usar biblioteca interface.notificacoes in
fim
```


## Atributos

| Atributo | Obrigatório | Tipo | Padrão | Descrição |
|---|---|---|---|---|
| `conteudo` | sim | Texto | — | A mensagem que será exibida |
| `tipo` | não | Texto | `"info"` | Estilo da notificação: `sucesso`, `erro`, `aviso` ou `info` |
| `duracao` | não | Número | `3000` | Tempo em milissegundos antes de sumir |
| `posicao` | não | Texto | `"baixo"` | Onde aparece: `"baixo"` (padrão) ou `"centro"` |

## Tipos de notificação

| Tipo | Cor | Uso |
|---|---|---|
| `sucesso` | Verde | Operação concluída com êxito |
| `erro` | Vermelho | Algo correu mal |
| `aviso` | Amarelo/Laranja | Atenção ou alerta |
| `info` | Azul | Informação geral |

Exemplos

Notificação básica (padrão)

```chorty
in:notificar
    conteudo="Olá, mundo!"
fim
```

Notificação de sucesso

```chorty
in:notificar
    tipo="sucesso"
    conteudo="Conta criada com sucesso!"
fim
```

Notificação de erro com duração prolongada

```chorty
in:notificar
    tipo="erro"
    duracao=5000
    conteudo="Falha na conexão. Tente novamente."
fim
```

Notificação central (popup estilo modal)

```chorty
in:notificar
    tipo="aviso"
    posicao="centro"
    conteudo="Atenção! Sessão vai expirar."
fim
```

# Notas técnicas

· O componente in:notificar requer uma aplicação gráfica (saida = "app" ou saida = "html") para funcionar, pois depende de CSS e DOM. Em modo script (console puro), utilize imprimir() para exibir mensagens.
· A duração é medida em milissegundos (1000 ms = 1 segundo).
· As notificações são empilhadas automaticamente: se várias forem chamadas em sequência, a anterior é removida antes da nova aparecer.