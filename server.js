require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = Number(process.env.PORT || 3000);

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(express.json({ limit: '25kb', strict: true }));

// Security headers. Vercel also applies these through vercel.json for static deployments.
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "img-src 'self' data: https:",
    "font-src 'self' https://fonts.gstatic.com data:",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com",
    "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com",
    "frame-src 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests"
  ].join('; '));
  next();
});

// Lightweight per-IP rate limiter for the public booking endpoint.
// For multi-instance/serverless production, prefer an external rate-limit store.
const rateBuckets = new Map();
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX = 5;

function rateLimit(req, res, next) {
  const now = Date.now();
  const ip = String(req.ip || req.socket.remoteAddress || 'unknown');
  const current = rateBuckets.get(ip);

  if (!current || now - current.startedAt >= RATE_WINDOW_MS) {
    rateBuckets.set(ip, { startedAt: now, count: 1 });
    return next();
  }

  current.count += 1;
  if (current.count > RATE_MAX) {
    const retryAfter = Math.ceil((RATE_WINDOW_MS - (now - current.startedAt)) / 1000);
    res.setHeader('Retry-After', String(retryAfter));
    return res.status(429).json({ message: 'Muitas solicitações. Tente novamente em alguns minutos.' });
  }

  return next();
}

function cleanText(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, maxLength);
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function createTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('SMTP não configurado.');
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE).toLowerCase() === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

const allowedServices = new Set([
  'Facial',
  'Corporal',
  'Cuidados com a pele',
  'Preenchimento de glúteos feminino',
  'Preenchimento de glúteos masculino',
  'Drenagem linfática',
  'Endolaser',
  'Injetáveis',
  'Ainda não sei'
]);

app.post('/api/agendamento', rateLimit, async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  if (!req.is('application/json')) {
    return res.status(415).json({ message: 'Formato de solicitação não suportado.' });
  }

  const body = req.body || {};

  // Honeypot: bots that fill the hidden field are silently rejected.
  if (cleanText(body.website, 100)) {
    return res.status(400).json({ message: 'Solicitação inválida.' });
  }

  const name = cleanText(body.name, 100);
  const phone = cleanText(body.phone, 30);
  const email = cleanText(body.email, 160).toLowerCase();
  const service = cleanText(body.service, 100);
  const message = cleanText(body.message, 1000);

  if (!name || !phone || !email || !service) {
    return res.status(400).json({ message: 'Preencha todos os campos obrigatórios.' });
  }

  if (name.length < 2 || phone.length < 8 || service.length < 2) {
    return res.status(400).json({ message: 'Confira os dados informados.' });
  }

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  if (!emailIsValid) {
    return res.status(400).json({ message: 'Informe um e-mail válido.' });
  }

  if (!allowedServices.has(service)) {
    return res.status(400).json({ message: 'Serviço selecionado inválido.' });
  }

  try {
    const transporter = createTransporter();
    const destination = process.env.CLINIC_EMAIL || process.env.SMTP_USER;

    await transporter.sendMail({
      from: `Site Aurêva <${process.env.SMTP_USER}>`,
      to: destination,
      replyTo: email,
      subject: `Nova solicitação de avaliação — ${name}`,
      text: [
        `Nome: ${name}`,
        `WhatsApp: ${phone}`,
        `E-mail: ${email}`,
        `Serviço: ${service}`,
        `Mensagem: ${message || 'Não informada'}`
      ].join('\n'),
      html: `
        <div style="font-family:Arial,sans-serif;color:#4d4033;line-height:1.6">
          <h2 style="color:#8e6939">Nova solicitação de avaliação — Aurêva</h2>
          <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
          <p><strong>WhatsApp:</strong> ${escapeHtml(phone)}</p>
          <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
          <p><strong>Serviço de interesse:</strong> ${escapeHtml(service)}</p>
          <p><strong>Mensagem:</strong><br>${escapeHtml(message || 'Não informada').replaceAll('\n', '<br>')}</p>
        </div>
      `
    });

    return res.status(200).json({ message: 'Solicitação enviada com sucesso.' });
  } catch (error) {
    console.error('Falha no envio de agendamento:', error.message);
    return res.status(500).json({ message: 'Não foi possível enviar a solicitação.' });
  }
});

// Generic JSON error handler: never expose stack traces or internal details.
app.use((error, _req, res, _next) => {
  if (error?.type === 'entity.too.large') {
    return res.status(413).json({ message: 'Solicitação muito grande.' });
  }
  return res.status(400).json({ message: 'Solicitação inválida.' });
});

const distPath = path.join(__dirname, 'dist', 'aureva-clinica', 'browser');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, {
    etag: true,
    maxAge: '1d',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache');
    }
  }));
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`API Aurêva rodando na porta ${port}`);
});
