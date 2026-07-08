'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Banner } from '../types'
import { urlFor } from '../lib/sanity.client'

interface HeroBannerProps {
  banners: Banner[]
}

export default function HeroBanner({ banners }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (banners.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [banners.length])

  if (!banners || banners.length === 0) {
    // Elegant fallback placeholder hero banner if CMS has no banners
    return (
      <div className="relative w-full h-[70vh] bg-stone-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/45 z-10" />
        <div className="absolute inset-0 bg-[url('/placeholder-hero.jpg')] bg-cover bg-center opacity-80" />
        <div className="relative z-20 text-center max-w-3xl px-6 text-white space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">New Collections</span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-wide">Capture The Golden Glow</h1>
          <p className="text-sm sm:text-lg font-light text-stone-200">Discover premium tanning oils and cosmetics made to highlight your sun-kissed beauty.</p>
          <Link
            href="/shop"
            className="inline-block rounded-full bg-primary px-8 py-3.5 text-sm font-semibold tracking-wider uppercase text-white hover:bg-primary/90 shadow-lg transition-colors"
          >
            Explore Shop
          </Link>
        </div>
      </div>
    )
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative w-full h-[65vh] sm:h-[80vh] overflow-hidden bg-stone-100 group">
      {/* Slides */}
      {banners.map((banner, index) => {
        const imageUrl = urlFor(banner.image).width(1600).height(900).url()
        const isActive = index === currentIndex

        return (
          <div
            key={banner._id}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-102 pointer-events-none'
            }`}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/35 z-10" />

            {/* Background Image */}
            <img
              src={imageUrl}
              alt={banner.heading || 'Hero banner'}
              className="w-full h-full object-cover object-center"
            />

            {/* Banner Details */}
            <div className="absolute inset-0 flex items-center justify-center z-20 px-4 sm:px-8">
              <div className="max-w-4xl text-center text-white space-y-4 sm:space-y-6">
                {banner.subheading && (
                  <span className={`inline-block text-xs font-semibold uppercase tracking-widest text-[#FAF8F7] bg-primary px-3.5 py-1.5 rounded-md shadow-sm transition-all duration-700 delay-300 transform ${
                    isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    {banner.subheading}
                  </span>
                )}
                {banner.heading && (
                  <h1 className={`font-serif text-4xl sm:text-6xl font-medium tracking-wide leading-tight transition-all duration-700 delay-500 transform ${
                    isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    {banner.heading}
                  </h1>
                )}
                {banner.buttonText && banner.buttonLink && (
                  <div className={`pt-2 transition-all duration-700 delay-700 transform ${
                    isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    <Link
                      href={banner.buttonLink}
                      className="inline-block rounded-full bg-primary hover:bg-primary/90 px-8 py-3.5 text-xs sm:text-sm font-semibold tracking-widest uppercase text-white shadow-lg border border-transparent active:scale-97 transition-all duration-200"
                    >
                      {banner.buttonText}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}

      {/* Slide Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xs p-3 text-white border border-white/20 shadow-md opacity-0 group-hover:opacity-100 active:scale-90 transition-all duration-300"
            aria-label="Previous slide"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xs p-3 text-white border border-white/20 shadow-md opacity-0 group-hover:opacity-100 active:scale-90 transition-all duration-300"
            aria-label="Next slide"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {banners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-6 bg-primary' : 'w-2.5 bg-white/60 hover:bg-white'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
