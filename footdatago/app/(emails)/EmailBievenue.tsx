import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailBienvenueProps {
  name?: string;
}

const EmailBienvenue: React.FC<EmailBienvenueProps> = ({
    name = "there",
}) => {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Section>
            <Text>Bonjour {name},</Text>
            <Text>Bienvenue sur notre plateforme !</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailBienvenue;
