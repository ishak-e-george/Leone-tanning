import React from 'react'
import { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { client } from '../../../lib/sanity.client'
import { siteSettingsQuery } from '../../../lib/queries'
import { SiteSettings } from '../../../types'
import ContactForm from './ContactForm'

export const revalidate = 60 // Enable ISR

export const metadata: Metadata = {
  title: 'Contact Us | LEONE',
  description: 'Have a question? Contact the LEONE team.',
}

export default async function ContactPage() {
  const settings: SiteSettings | null = await client.fetch(siteSettingsQuery).catch((err) => {
    console.error('Error fetching settings for contact page', err)
    return null
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 w-full space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#C87A80]">Get in Touch</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-stone-900 tracking-wide">
          Contact Customer Care
        </h1>
        <div className="h-0.5 w-16 bg-[#C87A80] mx-auto mt-3" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left: Contact Info */}
        <div className="space-y-8 bg-stone-50 p-6 sm:p-8 rounded-xl border border-stone-200/50">
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-stone-900">
              Our Headquarters
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              We are here to assist you with beauty advice, product inquiries, custom shade matchings, and delivery tracking.
            </p>
          </div>

          <div className="space-y-6">
            {/* Phone */}
            {settings?.phone && (
              <div className="flex gap-4 items-start">
                <div className="rounded-full bg-white p-3 text-[#C87A80] border border-stone-100 shadow-xs">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">Phone</h4>
                  <a href={`tel:${settings.phone}`} className="text-sm text-stone-900 hover:text-[#C87A80] font-medium transition-colors">
                    {settings.phone}
                  </a>
                </div>
              </div>
            )}

            {/* Email */}
            {settings?.email && (
              <div className="flex gap-4 items-start">
                <div className="rounded-full bg-white p-3 text-[#C87A80] border border-stone-100 shadow-xs">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">Email</h4>
                  <a href={`mailto:${settings.email}`} className="text-sm text-stone-900 hover:text-[#C87A80] font-medium transition-colors">
                    {settings.email}
                  </a>
                </div>
              </div>
            )}

            {/* Address */}
            {settings?.address && (
              <div className="flex gap-4 items-start">
                <div className="rounded-full bg-white p-3 text-[#C87A80] border border-stone-100 shadow-xs">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">Store Address</h4>
                  <p className="text-sm text-stone-900 leading-normal font-medium">
                    {settings.address}
                  </p>
                </div>
              </div>
            )}

            {/* Support Hours */}
            <div className="flex gap-4 items-start">
              <div className="rounded-full bg-white p-3 text-[#C87A80] border border-stone-100 shadow-xs">
                <Clock className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">Support Hours</h4>
                <p className="text-sm text-stone-900 leading-normal font-medium">
                  Monday &ndash; Saturday: 9:00 AM &ndash; 6:00 PM (EET)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Message Form */}
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
