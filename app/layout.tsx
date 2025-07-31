import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "Au Temple du Sushi - Bouc Bel Air | Restaurant Japonais & Sushi Bar",
  icons: {
    icon: "/favicon.ico",
  },
  description: "L'Art du Sushi, l'Âme du Japon. Dégustez des sushis frais et raffinés dans un cadre zen à Bouc Bel Air. Commande en ligne, à emporter ou livraison.",
  keywords: [
    "sushi Bouc Bel Air",
    "restaurant japonais Bouc Bel Air",
    "sushi bar Bouc Bel Air",
    "livraison sushi Bouc Bel Air",
    "meilleur sushi Bouc Bel Air",
    "au temple du sushi",
    "sushi frais",
    "plats japonais",
    "sushi à emporter",
    "restaurant asiatique Bouc Bel Air"
  ],
  authors: [{ name: "Au Temple du Sushi", url: "https://autempledusushi.fr" }],
  openGraph: {
    title: "Au Temple du Sushi - L'Art du Sushi à Bouc Bel Air",
    description: "Restaurant japonais haut de gamme à Bouc Bel Air. Plats faits maison, ingrédients frais, ambiance zen. Réservez ou commandez dès maintenant.",
    url: "https://autempledusushi.fr",
    siteName: "Au Temple du Sushi",
    images: [
      {
        url: "https://autempledusushi.fr/og-image.jpg", // Remplace avec ton image réelle
        width: 1200,
        height: 630,
        alt: "Plateau de sushi - Au Temple du Sushi"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Au Temple du Sushi - Restaurant Japonais à Bouc Bel Air",
    description: "Savourez les meilleurs sushis à Bouc Bel Air. Commande en ligne, livraison ou sur place.",
    images: ["https://autempledusushi.fr/og-image.jpg"] // Même image que Open Graph
  },
  metadataBase: new URL("https://autempledusushi.fr")
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={dmSans.variable}>
      <body className={dmSans.className}>{children}</body>
    </html>
  )
}
