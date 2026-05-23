'use client'

import { useCart } from './CartContext'

type Product = { id: string; title: string; price: number; image_url: string }

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart()

  return (
    <button
      onClick={(e) => {
        e.preventDefault() // Prevents the link from navigating if wrapped in an anchor
        addToCart(product)
      }}
      className="mt-4 w-full rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
    >
      Add to Cart
    </button>
  )
}