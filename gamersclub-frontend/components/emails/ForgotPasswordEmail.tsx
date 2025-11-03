import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ForgotPasswordEmailProps {
  resetLink: string;
  userName?: string;
}

export const ForgotPasswordEmail: React.FC<Readonly<ForgotPasswordEmailProps>> = ({
  resetLink,
  userName,
}) => (
  <Html>
    <Head />
    <Preview>Redefinir senha - GamersClub</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={headerTitle}>🎮 GamersClub</Heading>
        </Section>
        
        <Section style={content}>
          <Heading as="h2" style={title}>
            Olá{userName ? ` ${userName}` : ''}! 👋
          </Heading>
          
          <Text style={paragraph}>
            Recebemos um pedido para redefinir a tua senha na GamersClub.
          </Text>
          
          <Text style={paragraph}>
            Clica no botão abaixo para criar uma nova senha:
          </Text>
          
          <Section style={buttonContainer}>
            <Button style={button} href={resetLink}>
              Redefinir Senha 🔑
            </Button>
          </Section>
          
          <Text style={smallText}>
            Ou copia e cola este link no teu navegador:
          </Text>
          <Link href={resetLink} style={link}>
            {resetLink}
          </Link>
          
          <Hr style={hr} />
          
          <Text style={footer}>
            Se não solicitaste esta alteração, podes ignorar este email.
          </Text>
          <Text style={footer}>
            Este link expira em 1 hora por segurança.
          </Text>
        </Section>
        
        <Section style={footerSection}>
          <Text style={copyright}>
            © 2024 GamersClub - A tua loja de jogos favorita
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  maxWidth: '600px',
};

const header = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: '40px 20px',
  textAlign: 'center' as const,
};

const headerTitle = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0',
};

const content = {
  padding: '40px 30px',
};

const title = {
  color: '#333333',
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const paragraph = {
  color: '#555555',
  fontSize: '16px',
  lineHeight: '26px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const button = {
  backgroundColor: '#667eea',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '15px 40px',
};

const smallText = {
  color: '#777777',
  fontSize: '14px',
  lineHeight: '24px',
};

const link = {
  color: '#667eea',
  fontSize: '14px',
  wordBreak: 'break-all' as const,
};

const hr = {
  borderColor: '#dddddd',
  marginTop: '40px',
  marginBottom: '20px',
};

const footer = {
  color: '#999999',
  fontSize: '13px',
  margin: '10px 0',
};

const footerSection = {
  backgroundColor: '#333333',
  padding: '20px',
  textAlign: 'center' as const,
};

const copyright = {
  color: '#aaaaaa',
  fontSize: '12px',
  margin: '0',
};
