'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Plus, Minus, Trash2, ShoppingBag, MessageSquare } from 'lucide-react'
import { useCart } from '../../../context/CartContext'
import { urlFor } from '../../../lib/sanity.client'

interface CartClientProps {
  defaultWhatsappNumber?: string
}

export default function CartClient({ defaultWhatsappNumber = '+96170123456' }: CartClientProps) {
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart()

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
  })

  // Shipping Calculation
  // $5 flat rate shipping in Lebanon, free for orders above $50.
  const shippingCost = cartTotal >= 50 ? 0 : 5
  const finalTotal = cartTotal + shippingCost

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()

    if (cart.length === 0) return

    // 1. Format order text
    const itemsText = cart
      .map(
        (item) =>
          `- ${item.quantity}x ${item.product.name} ($${(item.product.discountPrice ?? item.product.price).toFixed(
            2
          )} each)`
      )
      .join('\n')

    const message = `Hi! I'd like to place an order:

Items:
${itemsText}

Subtotal: $${cartTotal.toFixed(2)}
Shipping: ${shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
Total Amount: $${finalTotal.toFixed(2)}

Delivery Info:
- Name: ${formData.name.trim()}
- Address: ${formData.address.trim()}
- Phone: ${formData.phone.trim()}`

    // 2. Build WhatsApp URL
    // Clean WhatsApp number: strip symbols and ensure it starts with country code
    const cleanNumber = defaultWhatsappNumber.replace(/[^0-9+]/g, '')
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`

    // 3. Open WhatsApp in new tab and reset cart
    window.open(whatsappUrl, '_blank')
    clearCart()
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 w-full space-y-10">
      {/* Header */}
      <div className="text-center md:text-left space-y-2 border-b border-stone-200 pb-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 tracking-wide">
          Your Shopping Cart
        </h1>
        <p className="text-sm text-stone-500">
          Review your items and complete order details to submit via WhatsApp.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-100 p-12 text-center max-w-2xl mx-auto space-y-5 shadow-xs">
          <div className="rounded-full bg-stone-50 p-6 text-stone-400 inline-block border border-stone-100">
            <ShoppingBag className="h-12 w-12" />
          </div>
          <h2 className="font-serif text-xl font-medium text-stone-900">Your cart is currently empty</h2>
          <p className="text-sm text-stone-500 leading-relaxed max-w-md mx-auto">
            Before proceeding to checkout you must add some products to your shopping cart. You will find a lot of interesting items on our shop page.
          </p>
          <Link
            href="/shop"
            className="inline-block rounded-full bg-primary px-8 py-3 text-xs font-semibold text-white uppercase tracking-wider hover:bg-primary/90 active:scale-97 transition-all shadow-md"
          >
            Explore Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-semibold text-stone-900 border-b border-stone-100 pb-3">
                Review Items
              </h3>
              <div className="divide-y divide-stone-100">
                {cart.map((item) => {
                  const { product, quantity } = item
                  const price = product.discountPrice ?? product.price
                  const mainImage = product.images?.[0]
                    ? urlFor(product.images[0]).width(150).height(150).url()
                    : '/placeholder-product.jpg'

                  return (
                    <div key={product._id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                      {/* Image */}
                      <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-lg bg-stone-50 border border-stone-100">
                        <img
                          src={mainImage}
                          alt={product.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h4 className="font-serif text-sm sm:text-base font-semibold text-stone-900 hover:text-primary transition-colors leading-tight">
                              <Link href={`/product/${product.slug}`}>{product.name}</Link>
                            </h4>
                            {product.category && (
                              <p className="text-[10px] uppercase font-bold tracking-widest text-primary mt-0.5">
                                {product.category.title}
                              </p>
                            )}
                          </div>
                          <span className="text-sm sm:text-base font-semibold text-stone-900">
                            ${(price * quantity).toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity Selector */}
                          <div className="flex items-center rounded-lg border border-stone-200 bg-stone-50">
                            <button
                              onClick={() => updateQuantity(product._id, quantity - 1)}
                              className="p-1.5 px-3 text-stone-600 hover:text-stone-900 transition-colors"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="px-2 text-sm font-semibold text-stone-800">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product._id, quantity + 1)}
                              className="p-1.5 px-3 text-stone-600 hover:text-stone-900 transition-colors"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          {/* Delete Item */}
                          <button
                            onClick={() => removeFromCart(product._id)}
                            className="text-stone-400 hover:text-red-500 p-1.5 transition-colors border border-transparent rounded-full hover:bg-stone-50"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Details & Summary */}
          <div className="space-y-6">
            {/* Form */}
            <form
              onSubmit={handleCheckout}
              className="bg-white rounded-2xl border border-stone-100 p-6 shadow-xs space-y-4"
            >
              <h3 className="font-serif text-lg font-semibold text-stone-900 border-b border-stone-100 pb-3">
                Delivery Details
              </h3>

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="w-full rounded-lg border border-stone-200 bg-white py-2 px-3.5 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Delivery Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street, City, Lebanon"
                  className="w-full rounded-lg border border-stone-200 bg-white py-2 px-3.5 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  WhatsApp Contact Phone
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+961 70 123 456"
                  className="w-full rounded-lg border border-stone-200 bg-white py-2 px-3.5 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Summary Details */}
              <div className="border-t border-stone-100 pt-4 space-y-2.5 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-stone-100 pt-2 flex justify-between font-semibold text-stone-900 text-base">
                  <span>Total Amount</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/90 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-md active:scale-98 transition-all"
              >
                <MessageSquare className="h-4.5 w-4.5" />
                Order via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
