'use client'

import React, { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 1500)
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-primary/5 rounded-xl border border-primary/20 space-y-4 animate-in fade-in zoom-in-95 duration-300">
        <CheckCircle2 className="h-12 w-12 text-primary" />
        <h3 className="font-serif text-lg font-semibold text-stone-900">Message Sent!</h3>
        <p className="text-sm text-stone-600 max-w-sm">
          Thank you for reaching out. A consultant will respond to your inquiry within 24 hours.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="rounded-full bg-primary px-6 py-2.5 text-xs font-semibold text-white uppercase tracking-wider hover:bg-primary/90 transition-all"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 sm:p-8 rounded-xl border border-stone-100 shadow-xs">
      <h3 className="font-serif text-lg font-semibold text-stone-900 border-b border-stone-100 pb-3">
        Send Us a Message
      </h3>

      {/* Name */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
          Full Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="John Doe"
          className="w-full rounded-lg border border-stone-200 bg-white py-2.5 px-4 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
          Email Address
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="john@example.com"
          className="w-full rounded-lg border border-stone-200 bg-white py-2.5 px-4 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Subject */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
          Subject
        </label>
        <input
          type="text"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          placeholder="Order Inquiry, Product Advice, etc."
          className="w-full rounded-lg border border-stone-200 bg-white py-2.5 px-4 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
          Message
        </label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Write your message here..."
          className="w-full rounded-lg border border-stone-200 bg-white py-2.5 px-4 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-primary transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/90 disabled:bg-stone-400 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-md active:scale-98 transition-all"
      >
        {isSubmitting ? (
          <span>Sending...</span>
        ) : (
          <>
            <Send className="h-3.5 w-3.5" />
            <span>Send Message</span>
          </>
        )}
      </button>
    </form>
  )
}
