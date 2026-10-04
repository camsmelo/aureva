require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json({ limit: '100kb' }));

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
    throw new Error('SMTP não configurado. Preencha o arquivo .env.');
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

app.post('/api/agendamento', async (req, res) => {
  const { name, phone, email, service, message } = req.body || {};

  if (!name || !phone || !email || !service) {
    return res.status(400).json({ message: 'Preencha todos os campos obrigatórios.' });
  }

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailIsValid) {
    return res.status(400).json({ message: 'Informe um e-mail válido.' });
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
    console.error('Erro ao enviar e-mail:', error.message);
    return res.status(500).json({ message: 'Não foi possível enviar a solicitação.' });
  }
});

// Em produção, pode servir o build do Angular pelo mesmo Node.
const distPath = path.join(__dirname, 'dist', 'aureva-clinica', 'browser');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`API Aurêva rodando em http://localhost:${port}`);
});
