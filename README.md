# Aurêva — Angular + GA4 + Contato + WhatsApp no agendamento

## Agendamento via WhatsApp

Ao enviar o formulário de avaliação, a aplicação abre o WhatsApp do contato principal da Aurêva:

- **WhatsApp:** +55 11 94295-1399

A mensagem é preenchida automaticamente com:
- Nome
- WhatsApp do cliente
- E-mail
- Serviço de interesse
- Mensagem adicional

O envio por `/api/agendamento` permanece ativo como cópia por e-mail quando o backend estiver configurado. Mesmo sem backend, o WhatsApp é aberto diretamente pelo navegador.

## GA4

O projeto mantém o `AnalyticsService` e o evento `booking_submit`.

Configure o Measurement ID em `src/app/services/analytics.service.ts`.

## Execução

```bash
npm install
npm start
```

Para usar a API de e-mail:

```bash
npm run server
```

Configure o `.env` conforme `.env.example`.
