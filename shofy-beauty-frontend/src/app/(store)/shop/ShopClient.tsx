'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Filter, SlidersHorizontal, Check } from 'lucide-react'
import ProductCard from '../../../components/ProductCard'
import { Category, Product } from '../../../types'

interface ShopClientProps {
  initialProducts: Product[]
  categories: Category[]
}

export default function ShopClient({ initialProducts, categories }: ShopClientProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Read URL search parameters on mount/update
  const urlSearch = searchParams.get('search') || ''
  const urlCategory = searchParams.get('category') || 'all'

  const [searchQuery, setSearchQuery] = useState(urlSearch)
  const [selectedCategory, setSelectedCategory] = useState(urlCategory)
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [sortBy, setSortBy] = useState('newest')

  // Sync state if URL changes
  useEffect(() => {
    setSearchQuery(urlSearch)
  }, [urlSearch])

  useEffect(() => {
    setSelectedCategory(urlCategory)
  }, [urlCategory])

  // Reset filters helper
  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setOnlyInStock(false)
    setSortBy('newest')
    router.replace('/shop')
  }

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts]

    // 1. Category Filter
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(
        (p) => p.category?.slug.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // 2. Search query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      )
    }

    // 3. Stock Filter
    if (onlyInStock) {
      result = result.filter((p) => p.inStock)
    }

    // 4. Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => {
        const pA = a.discountPrice ?? a.price
        const pB = b.discountPrice ?? b.price
        return pA - pB
      })
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => {
        const pA = a.discountPrice ?? a.price
        const pB = b.discountPrice ?? b.price
        return pB - pA
      })
    } else {
      // 'newest' - keep default CMS order (already sorted by _createdAt desc)
      result = result
    }

    return result
  }, [initialProducts, searchQuery, selectedCategory, onlyInStock, sortBy])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 w-full">
      {/* Page Title */}
      <div className="text-center md:text-left space-y-2 mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 tracking-wide">
          Our Collection
        </h1>
        <p className="text-sm text-stone-500">
          Discover natural elegance designed to match your daily ritual.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters (Desktop) */}
        <aside className="space-y-8 lg:block">
          {/* Search bar */}
          <div className="space-y-3">
            <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-stone-950">
              Search Products
            </h3>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-stone-200 bg-white py-2.5 px-4 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Categories Filter */}
          <div className="space-y-3">
            <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-stone-950">
              Categories
            </h3>
            <div className="flex flex-col space-y-1.5">
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  router.replace('/shop')
                }}
                className={`flex items-center justify-between text-left text-sm py-1.5 px-2.5 rounded-lg transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <span>All Categories</span>
                {selectedCategory === 'all' && <Check className="h-4 w-4" />}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => {
                    setSelectedCategory(cat.slug)
                    router.replace(`/shop?category=${cat.slug}`)
                  }}
                  className={`flex items-center justify-between text-left text-sm py-1.5 px-2.5 rounded-lg transition-colors ${
                    selectedCategory === cat.slug
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  <span>{cat.title}</span>
                  {selectedCategory === cat.slug && <Check className="h-4 w-4" />}
                </button>
              ))}
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="space-y-3 pt-2 border-t border-stone-200">
            <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-stone-950">
              Availability
            </h3>
            <label className="flex items-center gap-3 cursor-pointer text-sm text-stone-600 hover:text-stone-900 selection:bg-transparent">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="h-4.5 w-4.5 rounded-md border-stone-300 text-primary focus:ring-primary accent-primary"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* Products Grid & Sorting Controls */}
        <div className="lg:col-span-3 space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-stone-100 shadow-xs">
            <div className="text-xs sm:text-sm text-stone-500 font-medium">
              Showing <span className="text-stone-900 font-semibold">{filteredProducts.length}</span>{' '}
              {filteredProducts.length === 1 ? 'product' : 'products'}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <span className="text-xs sm:text-sm text-stone-500 shrink-0 font-medium">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-stone-200 bg-white py-1.5 px-3 text-xs sm:text-sm text-stone-700 outline-none focus:border-primary transition-colors cursor-pointer"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>

              {(searchQuery || selectedCategory !== 'all' || onlyInStock) && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Results Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-stone-100 shadow-xs space-y-3">
              <SlidersHorizontal className="h-10 w-10 text-stone-300 mx-auto" />
              <h3 className="font-serif text-lg font-semibold text-stone-900">No products found</h3>
              <p className="text-sm text-stone-500 max-w-[280px] mx-auto">
                We couldn't find matches. Try adjusting your search query or filters.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-2 rounded-full bg-stone-900 px-6 py-2 text-xs font-semibold text-white uppercase tracking-wider hover:bg-stone-855 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
