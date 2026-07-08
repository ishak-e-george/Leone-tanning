'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { X, Search } from 'lucide-react'

interface SearchBarProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query.trim())}`)
      onClose()
      setQuery('')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-24 backdrop-blur-sm transition-all duration-300">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#FAF8F7] p-6 shadow-2xl mx-4 border border-primary/10 animate-in fade-in slide-in-from-top-4 duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-900 transition-colors"
          aria-label="Close search"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-4 text-center font-serif text-2xl font-semibold text-stone-900">
          Search Products
        </h2>

        <form onSubmit={handleSubmit} className="relative mt-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for tanning oils, suncare, bronzers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-white py-4 pl-12 pr-4 text-stone-900 placeholder-stone-400 outline-none ring-1 ring-transparent focus:border-primary focus:ring-primary transition-all"
          />
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/95 active:scale-95 transition-all"
          >
            Search
          </button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <span className="text-xs text-stone-500 py-1">Popular searches:</span>
          {['Tanning Oil', 'SPF', 'Shimmer', 'Bronze'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                router.push(`/shop?search=${encodeURIComponent(tag)}`)
                onClose()
              }}
              className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600 hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
