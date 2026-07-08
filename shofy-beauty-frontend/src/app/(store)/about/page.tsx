import React from 'react'
import { Metadata } from 'next'
import { PortableText } from '@portabletext/react'
import { client } from '../../../lib/sanity.client'
import { pageBySlugQuery } from '../../../lib/queries'
import { StaticPage } from '../../../types'

export const revalidate = 60 // Enable ISR

export const metadata: Metadata = {
  title: 'About Our Brand | LEONE',
  description: 'Learn more about LEONE, our luxury tanning formulas, organic cosmetic standards, and our mission.',
}

export default async function AboutPage() {
  const page: StaticPage | null = await client.fetch(pageBySlugQuery, { slug: 'about' }).catch((err) => {
    console.error('Error fetching about page', err)
    return null
  })

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 w-full space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Our Story</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-stone-900 tracking-wide">
          About LEONE
        </h1>
        <div className="h-0.5 w-16 bg-primary mx-auto mt-3" />
      </div>

      {/* Main Content */}
      <div className="bg-white p-8 sm:p-12 rounded-2xl border border-stone-105 shadow-xs">
        {page?.content ? (
          <article className="prose max-w-none text-stone-650 text-sm leading-relaxed space-y-6">
            <PortableText
              value={page.content}
              components={{
                block: {
                  normal: ({ children }) => <p className="mb-6">{children}</p>,
                  h2: ({ children }) => <h2 className="font-serif text-2xl font-semibold text-stone-900 mt-10 mb-4 tracking-wide">{children}</h2>,
                  h3: ({ children }) => <h3 className="font-serif text-xl font-semibold text-stone-900 mt-8 mb-4 tracking-wide">{children}</h3>,
                },
                list: {
                  bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
                  number: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>,
                },
              }}
            />
          </article>
        ) : (
          /* Fallback UI: High-end content */
          <article className="space-y-8 text-stone-600 text-sm leading-relaxed">
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-medium text-stone-900 tracking-wide">
                Crafting Golden Radiance
              </h2>
              <p>
                Founded on the belief that beauty should capture the warmth of the sun while nourishing the skin, **LEONE** crafts premium tanning oils and cosmetics that celebrate natural radiance. Every formula is designed inside advanced botanical labs, uniting raw organic extracts with high-efficacy active compounds.
              </p>
              <p>
                We believe that cosmetic luxury should not come at the cost of sustainability. From sourcing organic carrier oils to choosing recyclable packaging, our footprint is guided by care for your skin and the earth.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-stone-100">
              <div className="space-y-2">
                <h3 className="font-serif text-base font-semibold text-stone-900">Our Vision</h3>
                <p className="text-xs text-stone-500">
                  To redefine sun-inspired beauty and tanning care in Lebanon and the Mediterranean region by proving that clean, natural formulations can deliver the deep golden results you desire.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-base font-semibold text-stone-900">Our Promise</h3>
                <p className="text-xs text-stone-500">
                  100% cruelty-free testing, dermatologically vetted formulas, and zero parabens, phthalates, or harsh artificial additives in any product we create.
                </p>
              </div>
            </div>
          </article>
        )}
      </div>
    </div>
  )
}
