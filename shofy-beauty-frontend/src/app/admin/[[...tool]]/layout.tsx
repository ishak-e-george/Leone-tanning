import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LEONE Tanning CMS',
  description: 'Manage products, categories, and site settings for LEONE.',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
