import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  interface EmailChangementPseudo {
    name?: string;
    ancienpseudo? : string,
    nouveaupseudo? : string
  }
  
  const EmailChangementPseudo: React.FC<EmailChangementPseudo> = ({
      name = "pseudo",
      ancienpseudo = "AncienPseudo",
      nouveaupseudo = "NouveauPseudo"
  }) => {
    return (
      <Html>
        <Head />
        <Body>
          <Container>
            <Section>
              <Text>Bonjour {name},</Text>
              <Text>Vous venez de changer votre pseudo de : {ancienpseudo} a {nouveaupseudo}</Text>
              <Text>Si ce changement de pseudo n'a pas été fait par vous sécurisez votre compte le plus vite possible</Text>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  };
  
  export default EmailChangementPseudo;
  