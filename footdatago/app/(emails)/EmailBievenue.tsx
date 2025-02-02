import { Html, Head, Body, Container, Section, Text } from '@react-email/components';
import * as React from 'react';

interface EmailBienvenueProps {
  username?: string;
}

const EmailBienvenue: React.FC<EmailBienvenueProps> = ({ 
  username = 'there'
}) => {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Section>
            <Text>Bonjour {username},</Text>
            <Text>Bienvenue sur notre plateforme !</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailBienvenue;