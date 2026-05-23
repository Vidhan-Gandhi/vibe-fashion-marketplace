'use client'

import Link from 'next/link'
import { useCart } from './CartContext'

export default function Navbar() {
  const { cart } = useCart()

  return (
    <nav className="border-b border-gray-100 bg-white px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link href="/" className="text-2xl font-extrabold tracking-tighter text-black">
        VIBE FASHION
      </Link>
      <div className="space-x-6 flex items-center">
        <Link href="/cart" className="text-sm font-medium text-black hover:text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full transition-colors">
          Cart ({cart.length})
        </Link>
        <Link href="/login" className="text-sm font-medium text-gray-500 hover:text-black">
          Seller Portal
        </Link>
      </div>
    </nav>
  )
}