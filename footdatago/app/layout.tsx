import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const dmSans = DM_Sans({
  subsets: ["latin"], 
  weight: ["400", "500", "700"], 

});

export const metadata: Metadata = {
  title: "FootDataGo",
  description: "Récupérez et comparez la data des joueurs des 5 grands championnats",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="relative"> 
      <body className={clsx(
        dmSans.className, 
        "antialiased " 
      )}>
        {children}
      </body>
    </html>
  );
}