'use client'

import { useEffect } from 'react'
import { useCart } from '../CartContext'
import Navbar from '../Navbar'
import Link from 'next/link'

export default function SuccessPage() {
  const { clearCart } = useCart()

  // As soon as this page loads, empty the shopping cart!
  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-500 mb-8">
            Thank you for your order. We are getting your fashion items ready for shipment!
          </p>
          
          <Link 
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    </div>
  )
}