import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "Au Temple du Sushi - Bouc Bel Air",
  description: "L'Art du Sushi, l'Âme du Japon. Restaurant de sushi haut de gamme à Bouc Bel Air.",
    generator: 'v0.dev'
}

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
