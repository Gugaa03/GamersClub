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
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';

interface Game {
  title: string;
  price: number;
  image?: string;
}

interface PurchaseReceiptEmailProps {
  userName: string;
  games: Game[];
  total: number;
  orderId: string;
  purchaseDate: string;
}

export const PurchaseReceiptEmail: React.FC<Readonly<PurchaseReceiptEmailProps>> = ({
  userName,
  games,
  total,
  orderId,
  purchaseDate,
}) => (
  <Html>
    <Head />
    <Preview>Recibo de Compra - GamersClub</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={headerTitle}>🎮 GamersClub</Heading>
          <Text style={headerSubtitle}>Recibo de Compra</Text>
        </Section>
        
        <Section style={content}>
          <Heading as="h2" style={title}>
            Obrigado pela tua compra, {userName}! 🎉
          </Heading>
          
          <Text style={paragraph}>
            A tua encomenda foi processada com sucesso. Aqui estão os detalhes:
          </Text>
          
          <Section style={orderBox}>
            <Text style={orderInfo}>
              Número do Pedido: <strong>{orderId}</strong>
            </Text>
            <Text style={orderInfo}>
              Data: <strong>{purchaseDate}</strong>
            </Text>
            
            <Heading as="h3" style={boxTitle}>
              Jogos Comprados
            </Heading>
            
            {games.map((game, index) => (
              <Section key={index} style={gameItem}>
                <Row>
                  <Column>
                    <Text style={gameTitle}>{game.title}</Text>
                  </Column>
                  <Column align="right">
                    <Text style={gamePrice}>€{game.price.toFixed(2)}</Text>
                  </Column>
                </Row>
              </Section>
            ))}
            
            <Hr style={totalHr} />
            
            <Row>
              <Column>
                <Text style={totalLabel}>Total</Text>
              </Column>
              <Column align="right">
                <Text style={totalPrice}>€{total.toFixed(2)}</Text>
              </Column>
            </Row>
          </Section>
          
          <Section style={libraryBox}>
            <Heading as="h3" style={libraryTitle}>
              📚 Acede à tua biblioteca
            </Heading>
            <Text style={libraryText}>
              Os teus jogos já estão disponíveis na tua biblioteca. Podes começar a jogar agora mesmo!
            </Text>
            <Button style={button} href={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/Library`}>
              Ver Biblioteca 🎮
            </Button>
          </Section>
          
          <Hr style={hr} />
          
          <Text style={footer}>
            Precisas de ajuda? Contacta-nos:
          </Text>
          <Link href="mailto:support@gamersclub.com" style={link}>
            support@gamersclub.com
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
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const paragraph = {
  color: '#555555',
  fontSize: '16px',
  lineHeight: '26px',
};

const orderBox = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '8px',
  border: '1px solid #e0e0e0',
  marginTop: '20px',
};

const orderInfo = {
  color: '#999999',
  fontSize: '13px',
  margin: '5px 0',
};

const boxTitle = {
  color: '#333333',
  fontSize: '18px',
  marginBottom: '15px',
  borderBottom: '2px solid #667eea',
  paddingBottom: '10px',
  marginTop: '20px',
};

const gameItem = {
  marginBottom: '15px',
  paddingBottom: '15px',
  borderBottom: '1px solid #eeeeee',
};

const gameTitle = {
  margin: '0',
  color: '#333333',
  fontSize: '16px',
  fontWeight: 'bold',
};

const gamePrice = {
  margin: '0',
  color: '#667eea',
  fontSize: '16px',
  fontWeight: 'bold',
};

const totalHr = {
  borderColor: '#333333',
  borderWidth: '2px',
  marginTop: '20px',
  marginBottom: '20px',
};

const totalLabel = {
  margin: '0',
  color: '#333333',
  fontSize: '20px',
  fontWeight: 'bold',
};

const totalPrice = {
  margin: '0',
  color: '#667eea',
  fontSize: '24px',
  fontWeight: 'bold',
};

const libraryBox = {
  backgroundColor: '#e8f4f8',
  padding: '20px',
  borderRadius: '8px',
  border: '1px solid #b3d9e8',
  marginTop: '20px',
};

const libraryTitle = {
  color: '#333333',
  fontSize: '16px',
  margin: '0 0 10px 0',
};

const libraryText = {
  color: '#555555',
  fontSize: '14px',
  margin: '0 0 15px 0',
  lineHeight: '22px',
};

const button = {
  backgroundColor: '#667eea',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 30px',
};

const hr = {
  borderColor: '#dddddd',
  marginTop: '30px',
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
  padding: '20px',
  textAlign: 'center' as const,
};

const copyright = {
  color: '#aaaaaa',
  fontSize: '12px',
  margin: '0',
};

const copyrightSmall = {
  color: '#777777',
  fontSize: '11px',
  margin: '10px 0 0 0',
};
