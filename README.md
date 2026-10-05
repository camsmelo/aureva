# Aurêva — Clínica de Estética Avançada

Site institucional responsivo desenvolvido em **Angular 20**, com foco em apresentação premium dos serviços da Aurêva, geração de leads e direcionamento para WhatsApp e Instagram.

## ✨ Recursos

- Layout responsivo para desktop, tablet e celular.
- Menu mobile com botão hamburger.
- Navegação por seções com indicação visual da seção ativa.
- Hero institucional com chamada para avaliação.
- Carrossel de procedimentos.
- Seção de benefícios e diferenciais da clínica.
- Depoimentos de clientes.
- Modal de agendamento.
- Formulário de avaliação com nome, WhatsApp, e-mail, serviço e mensagem.
- Redirecionamento do agendamento para o WhatsApp da clínica.
- Botões flutuantes de WhatsApp e Instagram.
- Seção de contato com WhatsApp dos profissionais.
- Integração preparada para Google Analytics 4.
- Backend Express/Nodemailer para envio de solicitações por e-mail quando executado com Node.
- Configuração de build para Vercel.

## 🛠️ Tecnologias

- Angular `20.3.33`
- Angular CLI `20.3.33`
- TypeScript `5.8.x`
- Node.js `20.19+` ou versão compatível dentro da faixa definida no `package.json`
- RxJS `7.8.x`
- Express `5.1.x`
- Nodemailer `7.x`
- CSS responsivo

## 📁 Estrutura principal

```text
.
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── booking-cta.component.*
│   │   │   ├── booking-modal.component.*
│   │   │   ├── contact.component.*
│   │   │   ├── floating-socials.component.*
│   │   │   ├── hero.component.*
│   │   │   ├── services.component.*
│   │   │   ├── site-data.ts
│   │   │   ├── site-footer.component.*
│   │   │   ├── site-header.component.*
│   │   │   ├── testimonials.component.*
│   │   │   └── why-us.component.*
│   │   ├── services/
│   │   │   └── analytics.service.ts
│   │   ├── app.component.*
│   │   └── app.config.ts
│   ├── assets/
│   │   ├── hero.jpg
│   │   ├── why.jpg
│   │   ├── cta.jpg
│   │   ├── testimonial.jpg
│   │   └── ícones/ilustrações dos procedimentos
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
├── server.js
├── vercel.json
├── .env.example
├── .nvmrc
└── tsconfig.json
```

## 🚀 Instalação local

Requisitos:

- Node.js `20.19.x` ou outra versão suportada pela configuração do projeto.
- npm atualizado.

Instale as dependências:

```bash
npm install
```

Inicie o Angular:

```bash
npm start
```

O projeto ficará disponível normalmente em:

```text
http://localhost:4200
```

## 🔨 Build de produção

Para gerar o build:

```bash
npm run build
```

Os arquivos de produção são gerados em:

```text
dist/aureva-clinica/browser
```

## 🖥️ Executando com Express

O projeto possui `server.js` para executar a API de agendamento e, quando o build existir, servir também os arquivos estáticos do Angular.

Instale as dependências e execute:

```bash
npm run build
npm run server
```

Ou, para desenvolvimento com Angular e API simultaneamente:

```bash
npm run start:all
```

A API local fica disponível em:

```text
http://localhost:3000
```

## 📧 Configuração do envio de e-mail

O backend utiliza SMTP através do Nodemailer.

Crie um arquivo `.env` na raiz do projeto:

```env
CLINIC_EMAIL=contato@aureva.com.br

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contato@aureva.com.br
SMTP_PASS=SUA_SENHA_DE_APP

PORT=3000
```

Existe um modelo em:

```text
.env.example
```

### Gmail / Google Workspace

Para contas Google, prefira utilizar uma **senha de aplicativo** em vez da senha normal da conta.

Nunca publique o arquivo `.env` no GitHub.

## 💬 WhatsApp

O formulário de avaliação utiliza o WhatsApp da clínica para facilitar o contato comercial.

Número configurado no projeto:

```text
+55 11 94295-1399
```

O envio abre uma conversa no WhatsApp com os dados preenchidos no formulário.

## 📸 Instagram

Instagram configurado no projeto:

```text
@aurevaesteticaavancada
https://www.instagram.com/aurevaesteticaavancada/
```

## 📊 Google Analytics 4

O projeto possui `AnalyticsService` preparado para registrar eventos como:

- `booking_open`
- `service_select`
- `booking_submit`
- `whatsapp_click`
- `instagram_click`
- `contact_whatsapp_click`

Antes da publicação, configure o **Measurement ID real do GA4** no ponto indicado pelo código, substituindo o identificador de exemplo caso ainda esteja presente.

## 🌐 Deploy na Vercel

O projeto possui `vercel.json` configurado para o build Angular:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist/aureva-clinica/browser",
  "framework": "angular",
  "installCommand": "npm install"
}
```

### Deploy pelo GitHub

```bash
git add .
git commit -m "deploy: Aureva site"
git push
```

Depois, importe o repositório na Vercel.

### Importante sobre as versões Angular

As versões dos pacotes Angular foram **fixadas**, sem `^`, para evitar que o npm instale versões diferentes entre os pacotes e gere erros `ERESOLVE`.

O projeto utiliza:

```text
Angular: 20.3.33
Angular CLI: 20.3.33
Angular DevKit: 20.3.33
Compiler CLI: 20.3.33
```

Não altere apenas um pacote Angular para outra versão. Ao atualizar Angular, mantenha os pacotes principais e as ferramentas na mesma versão compatível.

## ⚠️ API de e-mail e Vercel

O `vercel.json` atual configura o projeto como um build Angular estático. O arquivo `server.js` é utilizado para execução com Node/Express local ou em um ambiente que execute o servidor Node.

Se o objetivo for enviar o formulário por SMTP **diretamente no deploy da Vercel**, a rota `/api/agendamento` deverá ser migrada para uma **Vercel Function** (por exemplo, `api/agendamento.js/ts`) ou para um serviço/backend externo.

O redirecionamento do formulário para WhatsApp funciona no frontend e não depende do servidor Express.

## 📱 Responsividade

O layout possui ajustes específicos para:

- Desktop.
- Tablets.
- Smartphones.
- Telas pequenas de até aproximadamente 380px.
- Menu mobile.
- Modal de agendamento em telas pequenas.
- Carrossel de serviços com navegação por toque.
- Botões flutuantes respeitando áreas seguras de dispositivos móveis.
- Prevenção de overflow horizontal.

## 🧪 Comandos úteis

```bash
# Instalar dependências
npm install

# Rodar Angular em desenvolvimento
npm start

# Build de produção
npm run build

# Build em modo watch
npm run watch

# Rodar API/backend Express
npm run server

# Rodar Angular + Express simultaneamente
npm run start:all
```

## 🔐 Boas práticas antes de publicar

- Não versionar `.env`.
- Não colocar senhas SMTP no código.
- Configurar as variáveis sensíveis no ambiente de produção.
- Substituir o Measurement ID de exemplo do GA4 pelo ID real.
- Conferir os links e números de WhatsApp antes do lançamento.
- Executar `npm install` e `npm run build` antes de enviar alterações para produção.
- Confirmar no GitHub que o `package.json` da raiz é o mesmo utilizado pela Vercel.

## 👩‍💻 Desenvolvimento

Projeto desenvolvido para a **Aurêva Clínica de Estética Avançada**, com arquitetura baseada em componentes standalone do Angular.

---

**Aurêva Clínica de Estética Avançada**  
Website institucional e canal digital de agendamento.

## 🔐 Segurança

O projeto inclui uma camada de segurança para o site e para o endpoint de agendamento.

### Proteções implementadas

- **Headers HTTP de segurança** no `vercel.json` e no servidor Express:
  - `Content-Security-Policy (CSP)`
  - `Strict-Transport-Security (HSTS)`
  - `X-Content-Type-Options`
  - `X-Frame-Options`
  - `Referrer-Policy`
  - `Permissions-Policy`
  - `Cross-Origin-Opener-Policy`
- **Proteção contra clickjacking** com `frame-ancestors 'none'` e `X-Frame-Options: DENY`.
- **Limite de tamanho do JSON** (`25kb`) para reduzir abuso do endpoint.
- **Rate limiting** no endpoint `/api/agendamento`: até 5 solicitações por IP em uma janela de 15 minutos por instância.
- **Honeypot anti-bot** invisível no formulário de agendamento.
- **Validação server-side** de nome, telefone, e-mail, serviço e mensagem.
- **Limites de tamanho dos campos** para evitar payloads excessivos.
- **Lista permitida de serviços** para impedir que um cliente envie valores arbitrários para o backend.
- **Escape de HTML** antes de inserir dados do formulário no e-mail.
- **Mensagens de erro genéricas** no backend, sem exposição de stack trace ou credenciais.
- **`Cache-Control: no-store`** para respostas do endpoint de agendamento.
- **Segredos SMTP somente por variáveis de ambiente**. Nunca coloque senha SMTP, token ou chave privada no código-fonte.
- **`X-Powered-By` desabilitado** no Express.

### Variáveis de ambiente

Mantenha as credenciais somente no `.env` local e nas Environment Variables da Vercel:

```env
CLINIC_EMAIL=contato@aureva.com.br
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contato@aureva.com.br
SMTP_PASS=sua_senha_de_app
```

O arquivo `.env` **não deve ser versionado**. O projeto já possui `.env` no `.gitignore`.

### Boas práticas para produção

1. Use HTTPS sempre.
2. Utilize uma **senha de aplicativo** no provedor de e-mail, nunca a senha principal da conta.
3. Configure as variáveis SMTP diretamente no painel da Vercel.
4. Não envie credenciais para o GitHub.
5. Não utilize `npm install --force` ou `--legacy-peer-deps` para contornar vulnerabilidades ou conflitos reais.
6. Para alta escala, substitua o rate limiter em memória por um armazenamento externo (Redis/KV), pois instâncias serverless não compartilham memória.
7. Faça periodicamente `npm audit` e atualize dependências com revisão das mudanças.

> **Importante sobre a Vercel:** os headers definidos em `vercel.json` protegem os arquivos publicados pelo domínio. O `server.js` contém as proteções do endpoint Express quando ele é executado em um servidor Node. Se o formulário `/api/agendamento` for migrado para uma Vercel Function, mantenha as mesmas validações, autenticação de SMTP por variáveis de ambiente e rate limiting com armazenamento externo.
