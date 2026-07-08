'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { urlFor } from '../lib/sanity.client'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useCart()

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#FAF8F7] shadow-2xl transition-transform duration-300 ease-in-out transform flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5 bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="font-serif text-lg font-semibold text-stone-900">Your Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-900 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable list of items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="rounded-full bg-stone-105 p-6 text-stone-400">
                <ShoppingBag className="h-12 w-12" />
              </div>
              <h3 className="font-medium text-stone-900 text-lg">Your cart is empty</h3>
              <p className="text-sm text-stone-500 max-w-[250px]">
                Add products from our shop to get started with your order.
              </p>
              <button
                onClick={onClose}
                className="mt-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition-all"
              >
                Shop Now
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const { product, quantity } = item
              const price = product.discountPrice ?? product.price
              const imageUrl = product.images?.[0] ? urlFor(product.images[0]).width(120).url() : '/placeholder-product.jpg'

              return (
                <div
                  key={product._id}
                  className="flex gap-4 bg-white p-3 rounded-xl border border-stone-100 hover:shadow-xs transition-shadow"
                >
                  {/* Image */}
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-stone-50 border border-stone-100">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between text-base font-medium text-stone-900">
                        <h4 className="line-clamp-1 pr-2 text-sm font-serif">
                          {product.name}
                        </h4>
                        <p className="text-sm font-semibold text-stone-900">
                          ${(price * quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-0.5 text-xs text-stone-500">
                        ${price.toFixed(2)} each
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Selector */}
                      <div className="flex items-center rounded-lg border border-stone-200 bg-stone-50">
                        <button
                          onClick={() => updateQuantity(product._id, quantity - 1)}
                          className="p-1 px-2 text-stone-600 hover:text-stone-900 transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-stone-800">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product._id, quantity + 1)}
                          className="p-1 px-2 text-stone-600 hover:text-stone-900 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(product._id)}
                        className="text-stone-400 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer info & checkout */}
        {cart.length > 0 && (
          <div className="border-t border-stone-200 bg-white p-6 space-y-4">
            <div className="flex justify-between text-base font-medium text-stone-900">
              <span className="font-serif">Subtotal</span>
              <span className="font-semibold text-lg">${cartTotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-stone-500 leading-normal">
              Shipping and taxes are calculated at checkout. Orders will be submitted directly to our WhatsApp store.
            </p>
            <div className="grid grid-cols-1 gap-2">
              <Link
                href="/cart"
                onClick={onClose}
                className="flex items-center justify-center rounded-full bg-primary py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-all shadow-md hover:shadow-lg active:scale-98"
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={onClose}
                className="flex items-center justify-center rounded-full border border-stone-200 bg-white py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
