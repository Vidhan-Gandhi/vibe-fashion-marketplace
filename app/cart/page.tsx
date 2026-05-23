'use client'

import { useCart } from '../CartContext'
import Navbar from '../Navbar'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const { cart, removeFromCart, cartTotal } = useCart()
  
  // Initialize the router so we can navigate the user to the success page
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-xl text-gray-500">Your cart is currently empty.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {cart.map((product, index) => (
                <li key={`${product.id}-${index}`} className="flex py-6 px-6 sm:px-8">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{product.title}</h3>
                        <p className="ml-4">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <button
                        onClick={() => removeFromCart(product.id)}
                        type="button"
                        className="font-medium text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-200 px-6 py-6 sm:px-8 bg-gray-50">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p>${cartTotal.toFixed(2)}</p>
              </div>
              <p className="text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
              
              {/* The updated checkout button! */}
              <button
                className="w-full flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 transition-colors"
                onClick={() => router.push('/success')}
              >
                Proceed to Checkout
              </button>
              
            </div>
          </div>
        )}
      </main>
    </div>
  )
}