import React from 'react'
import { Metadata } from 'next'
import { client } from '../../../lib/sanity.client'
import { siteSettingsQuery } from '../../../lib/queries'
import { SiteSettings } from '../../../types'
import CartClient from './CartClient'

export const revalidate = 60 // Enable ISR

export const metadata: Metadata = {
  title: 'Shopping Cart | LEONE',
  description: 'Review your items and enter shipping details to place your order.',
}

export default async function CartPage() {
  const settings: SiteSettings | null = await client.fetch(siteSettingsQuery).catch((err) => {
    console.error('Error fetching settings for cart checkout', err)
    return null
  })

  return <CartClient defaultWhatsappNumber={settings?.whatsapp} />
}
