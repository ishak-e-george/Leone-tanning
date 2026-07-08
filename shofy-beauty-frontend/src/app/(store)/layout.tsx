import type { Metadata } from "next"
import "../globals.css"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { client } from "../../lib/sanity.client"
import { siteSettingsQuery } from "../../lib/queries"

export const metadata: Metadata = {
  title: "LEONE | Tanning & Cosmetics",
  description: "Experience premium, luxury tanning oils and cosmetics.",
}

export const revalidate = 60 // Revalidate layout settings every minute

export default async function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await client.fetch(siteSettingsQuery).catch((err) => {
    console.error("Error fetching site settings from Sanity", err)
    return null
  })

  return (
    <>
      <Header settings={settings} />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer settings={settings} />
    </>
  )
}
