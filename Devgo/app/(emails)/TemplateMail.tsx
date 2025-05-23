// components/BaseEmailLayout.tsx
import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Text,
  } from "@react-email/components";
import Image from "next/image";
  import * as React from "react";
  
  interface BaseEmailLayoutProps {
    children: React.ReactNode;
    title?: string;
  }
  
  export const BaseEmailLayout: React.FC<BaseEmailLayoutProps> = ({
    children,
    title = "Notification",
  }) => (
    <Html>
      <Head />
      <Body
        style={{
          backgroundColor: "#f4f4f7",
          fontFamily: "Inter, Arial, sans-serif",
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            backgroundColor: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            maxWidth: 480,
            margin: "40px auto",
            padding: "32px 24px",
          }}
        >
          <Section style={{ textAlign: "center", marginBottom: 24 }}>
            <Image
              src={"Logo_FC_Liverpool.svg.png"}
              alt="Logo"
              width={48}
              height={48}
              style={{ borderRadius: 8, marginBottom: 8 }}
            />
            <Text
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#222",
                margin: 0,
                letterSpacing: 0.5,
              }}
            >
              {title}
            </Text>
          </Section>
          <Section>{children}</Section>
          <Section style={{ marginTop: 32, textAlign: "center" }}>
            <Text
              style={{
                fontSize: 12,
                color: "#888",
                margin: 0,
              }}
            >
              © {new Date().getFullYear()} Votre Société. Tous droits réservés.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
  