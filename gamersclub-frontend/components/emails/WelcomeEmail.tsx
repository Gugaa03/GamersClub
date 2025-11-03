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

interface WelcomeEmailProps {
  userName: string;
  userEmail: string;
}

export const WelcomeEmail: React.FC<Readonly<WelcomeEmailProps>> = ({
  userName,
  userEmail,
}) => (
  <Html>
    <Head />
    <Preview>Bem-vindo à GamersClub!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={headerTitle}>🎮 GamersClub</Heading>
          <Text style={headerSubtitle}>Bem-vindo à Comunidade!</Text>
        </Section>
        
        <Section style={content}>
          <Heading as="h2" style={title}>
            Olá, {userName}! 👋
          </Heading>
          
          <Text style={paragraph}>
            É com grande entusiasmo que te damos as boas-vindas à <strong>GamersClub</strong>, a tua nova loja de jogos favorita! 🎉
          </Text>
          
          <Text style={paragraph}>
            A tua conta foi criada com sucesso e estás pronto para explorar milhares de jogos incríveis.
          </Text>
          
          <Section style={accountBox}>
            <Heading as="h3" style={boxTitle}>
              📧 Detalhes da Conta
            </Heading>
            <Text style={accountText}>
              <strong>Nome:</strong> {userName}
            </Text>
            <Text style={accountText}>
              <strong>Email:</strong> {userEmail}
            </Text>
          </Section>
          
          <Section style={stepsBox}>
            <Heading as="h3" style={stepsTitle}>
              🚀 Próximos Passos
            </Heading>
            <Text style={stepsText}>• Explora a nossa coleção de jogos</Text>
            <Text style={stepsText}>• Adiciona fundos à tua carteira</Text>
            <Text style={stepsText}>• Compra os teus jogos favoritos</Text>
            <Text style={stepsText}>• Acede à tua biblioteca a qualquer momento</Text>
          </Section>
          
          <Section style={buttonContainer}>
            <Button style={button} href={process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}>
              Começar a Explorar 🎮
            </Button>
          </Section>
          
          <Hr style={hr} />
          
          <Text style={footer}>
            Tens dúvidas? A nossa equipa está aqui para ajudar!
          </Text>
          <Link href="mailto:support@gamersclub.com" style={link}>
            📧 support@gamersclub.com
          </Link>
        </Section>
        
        <Section style={footerSection}>
          <Text style={copyright}>
            © 2024 GamersClub - A tua loja de jogos favorita
          </Text>
          <Text style={copyrightSmall}>
            Este é um email automático, por favor não respondas.
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

const headerSubtitle = {
  color: 'rgba(255,255,255,0.9)',
  fontSize: '18px',
  margin: '10px 0 0 0',
};

const content = {
  padding: '40px 30px',
};

const title = {
  color: '#333333',
  fontSize: '28px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const paragraph = {
  color: '#555555',
  fontSize: '16px',
  lineHeight: '26px',
  marginBottom: '20px',
};

const accountBox = {
  backgroundColor: '#ffffff',
  padding: '25px',
  borderRadius: '8px',
  border: '1px solid #e0e0e0',
  marginBottom: '30px',
};

const boxTitle = {
  color: '#667eea',
  fontSize: '20px',
  margin: '0 0 15px 0',
};

const accountText = {
  color: '#555555',
  fontSize: '15px',
  margin: '8px 0',
};

const stepsBox = {
  backgroundColor: '#f0f7ff',
  padding: '25px',
  borderRadius: '8px',
  border: '1px solid #b3d9ff',
  marginBottom: '30px',
};

const stepsTitle = {
  color: '#333333',
  fontSize: '18px',
  margin: '0 0 15px 0',
};

const stepsText = {
  color: '#555555',
  fontSize: '15px',
  lineHeight: '28px',
  margin: '5px 0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '40px 0',
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
  padding: '15px 50px',
  boxShadow: '0 4px 10px rgba(102, 126, 234, 0.3)',
};

const hr = {
  borderColor: '#dddddd',
  marginTop: '40px',
  marginBottom: '20px',
};

const footer = {
  color: '#777777',
  fontSize: '14px',
  margin: '10px 0',
};

const link = {
  color: '#667eea',
  fontSize: '14px',
};

const footerSection = {
  backgroundColor: '#333333',
  padding: '25px 20px',
  textAlign: 'center' as const,
};

const copyright = {
  color: '#aaaaaa',
  fontSize: '12px',
  margin: '10px 0',
};

const copyrightSmall = {
  color: '#777777',
  fontSize: '11px',
  margin: '0',
};
