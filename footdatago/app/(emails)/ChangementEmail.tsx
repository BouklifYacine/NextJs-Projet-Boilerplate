import { Html, Head, Body, Container, Section, Text } from '@react-email/components';
import * as React from 'react';

interface EmailChangement {
  email: string;
  ancienemail : string
  pseudo: string

}

const EmailChangement: React.FC<EmailChangement> = ({ email, ancienemail,  pseudo   }) => {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Section>
            <Text>Bonjour {pseudo}</Text>
            <Text>Vous venez de changez votre Email </Text>
            <Text >Votre email est passé de : {ancienemail} a {email}</Text>
            <Text>Si ce changement d'email n'a pas été fait par vous sécurisez votre compte le plus vite possible</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailChangement;