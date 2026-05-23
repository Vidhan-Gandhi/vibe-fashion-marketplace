import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

export default async function Navbar() {
  const supabase = await createClient()
  
  // Check if a user is currently logged in
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-extrabold tracking-tight text-gray-900">
              VIBE FASHION
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link href="/cart" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Cart
            </Link>
            
            {user ? (
              <>
                <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                  Seller Portal
                </Link>
                
                {/* The NEW Secure Sign Out Form */}
                <form action="/auth/signout" method="post" className="m-0 p-0 flex">
                  <button 
                    type="submit" 
                    className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                  >
                    Sign Out
                  </button>
                </form>
              </>
            ) : (
              <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Seller Login
              </Link>
            )}
          </div>
          
        </div>
      </div>
    </nav>
  )
}