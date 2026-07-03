# servicos.mensagens (sms)

Envio e leitura de SMS nativos do Android. No modo script, usa dados simulados para testes. No APK, usa SmsManager real.

## Instalação

usar biblioteca servicos.mensagens sms

## Métodos

sms.enviar(numero, texto) — envia SMS
sms.recebidos() — lista todos os SMS recebidos
sms.de(numero) — SMS de um contacto específico
sms.enviados() — lista SMS enviados
sms.apagar(id) — apaga uma mensagem

## Exemplo

usar biblioteca servicos.mensagens sms

sms.enviar("+244912345678", "Ola do Chorty!")

mensagens = sms.recebidos()
imprimir(mensagens[0].texto)

## Notas

Requer permissões ENVIAR_SMS e LER_SMS no .ConfigApp
Dados simulados no modo script
Funcionalidade real apenas no APK compilado