import type { Metadata } from "next"
import { Cinzel, Outfit } from "next/font/google"
import "./globals.css"
import { CartProvider } from "../context/CartContext"
import { WishlistProvider } from "../context/WishlistContext"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { client } from "../lib/sanity.client"
import { siteSettingsQuery } from "../lib/queries"

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "LEONE | Tanning & Cosmetics",
  description: "Experience premium, luxury tanning oils and cosmetics.",
}

export const revalidate = 60 // Revalidate layout settings every minute

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await client.fetch(siteSettingsQuery).catch((err) => {
    console.error("Error fetching site settings from Sanity", err)
    return null
  })

  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF8F7] text-stone-900 selection:bg-[#C87A80]/20 selection:text-[#C87A80]">
        <CartProvider>
          <WishlistProvider>
            <Header settings={settings} />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer settings={settings} />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}
