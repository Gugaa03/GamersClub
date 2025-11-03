import type { NextApiRequest, NextApiResponse } from 'next';
import { WelcomeEmail } from '../../components/emails/WelcomeEmail';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, userName } = req.body;

  if (!email || !userName) {
    return res.status(400).json({ error: 'Email e userName são obrigatórios' });
  }

  try {
    const emailHtml = await render(
      React.createElement(WelcomeEmail, { userName, userEmail: email })
    );
    
    const { data, error } = await resend.emails.send({
      from: 'GamersClub <onboarding@resend.dev>',
      to: [email],
      subject: '🎮 Bem-vindo à GamersClub!',
      html: emailHtml,
    });

    if (error) {
      console.error('Erro ao enviar email:', error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error('Erro no servidor:', error);
    res.status(500).json({ error: error.message || 'Erro ao enviar email' });
  }
}
