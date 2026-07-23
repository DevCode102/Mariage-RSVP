import type { Metadata } from "next";
import { Great_Vibes, Montserrat, Playfair_Display } from "next/font/google";
import { EmojiBubbles } from "@/components/EmojiBubbles";
import { ScrollProgressButton } from "@/components/ScrollProgressButton";
import { getSiteContent } from "@/lib/site-content-db";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
});

const sans = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Stevie & Anderson | Notre Mariage",
  description:
    "Nous avons le bonheur de vous annoncer notre union. Confirmez votre présence.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getSiteContent();

  return (
    <html lang="fr">
      <body
        className={`${display.variable} ${script.variable} ${sans.variable} antialiased`}
      >
        <EmojiBubbles
          enabled={Boolean(content.bubbleEnabled)}
          emojis={
            Array.isArray(content.bubbleEmojis) && content.bubbleEmojis.length > 0
              ? content.bubbleEmojis
              : ["❤️", "🧡", "💕"]
          }
        />
        {children}
        <ScrollProgressButton />
      </body>
    </html>
  );
}
