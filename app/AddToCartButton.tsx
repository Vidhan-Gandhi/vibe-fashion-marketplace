'use client'

import { useCart } from '@/app/CartContext'

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart()

  // This function adds the item and gives a little browser alert so you know it worked!
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image_url: product.image_url
    })
    alert(`${product.title} has been added to your cart!`)
  }

  return (
    <button 
      onClick={handleAddToCart}
      className="mt-4 w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
    >
      Add to Cart
    </button>
  )
}