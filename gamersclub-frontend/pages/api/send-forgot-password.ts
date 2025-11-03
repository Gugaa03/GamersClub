import type { NextApiRequest, NextApiResponse } from 'next';
import { ForgotPasswordEmail } from '../../components/emails/ForgotPasswordEmail';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, resetLink, userName } = req.body;

  console.log('📧 Tentando enviar email para:', email);
  console.log('🔑 Reset link:', resetLink);
  console.log('👤 Nome de usuário:', userName);
  console.log('🔐 API Key configurada:', !!process.env.RESEND_API_KEY);

  if (!email || !resetLink) {
    return res.status(400).json({ error: 'Email e resetLink são obrigatórios' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY não está configurada!');
    return res.status(500).json({ error: 'Configuração do servidor incompleta' });
  }

  try {
    console.log('📨 Enviando email via Resend...');
    
    const emailHtml = await render(
      React.createElement(ForgotPasswordEmail, { resetLink, userName })
    );
    
    const { data, error } = await resend.emails.send({
      from: 'GamersClub <onboarding@resend.dev>',
      to: [email],
      subject: '🔑 Redefinir Senha - GamersClub',
      html: emailHtml,
    });

    if (error) {
      console.error('❌ Erro ao enviar email:', error);
      return res.status(400).json({ error: error.message || 'Erro ao enviar email' });
    }

    console.log('✅ Email enviado com sucesso!', data);
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error('❌ Erro no servidor:', error);
    console.error('Stack:', error.stack);
    res.status(500).json({ error: error.message || 'Erro ao enviar email' });
  }
}
