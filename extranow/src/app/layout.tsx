import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: {
    default: "Extra Now - L'Élite de l'Hôtellerie en un Clic",
    template: "%s | Extra Now",
  },
  description: "La plateforme premium et rapide pour recruter du personnel qualifié en hôtellerie et restauration. Trouvez des cuisiniers, serveurs, et barmans certifiés instantanément en France.",
  keywords: ["Extra", "Restauration", "Hôtellerie", "Recrutement", "Serveur", "Cuisinier", "Barman", "Missions courtes", "CDD", "Paris", "France"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.extranow.fr",
    title: "Extra Now - L'Élite de l'Hôtellerie en un Clic",
    description: "Connectez-vous instantanément aux meilleurs talents de la restauration. Qualité, rapidité, excellence.",
    siteName: "Extra Now",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-slate-900`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
