import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface SuppressionCompte {
  pseudo: string;
}

const SuppressionCompte: React.FC<SuppressionCompte> = ({ pseudo }) => {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Section>
            <Text>Bonjour {pseudo}</Text>
            <Text>Votre compte a été supprimer définitivement. </Text>
          
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default SuppressionCompte;
