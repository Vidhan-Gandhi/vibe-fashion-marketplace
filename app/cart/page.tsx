'use client'

import { useCart } from '@/app/CartContext'
import Link from 'next/link'

export default function CartPage() {
  const { cart, removeFromCart } = useCart()

  // Calculated dynamically to avoid "not a function" errors
  const cartTotal = cart.reduce((total, item) => total + Number(item.price || 0), 0)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <p className="text-gray-500 mb-4">Your cart is empty.</p>
            <Link href="/" className="text-black font-medium hover:underline">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {cart.map((item, index) => (
                // Used index to ensure unique keys for duplicate items
                <li key={`${item.id}-${index}`} className="flex py-6 px-4 sm:px-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.image_url || 'https://via.placeholder.com/150'}
                      alt={item.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.title}</h3>
                        <p className="ml-4">${Number(item.price).toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="font-medium text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${cartTotal.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <button 
                  onClick={() => alert("Checkout initiated! In the next phase, we'll connect this to a real payment gateway.")}
                  className="w-full flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}