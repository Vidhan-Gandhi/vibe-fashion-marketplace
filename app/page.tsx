import { createClient } from '@/utils/supabase/server'
import Navbar from './Navbar'
import AddToCartButton from './AddToCartButton'
import Link from 'next/link'

// In Next.js 15, searchParams (the URL parameters) are also a Promise!
export default async function Home({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const resolvedSearchParams = await searchParams
  const currentCategory = resolvedSearchParams.category

  const supabase = await createClient()

  // 1. Start building our database query
  let query = supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  // 2. If the URL has a category (e.g., ?category=Men), filter the database results!
  if (currentCategory) {
    query = query.eq('category', currentCategory)
  }

  // 3. Execute the query
  const { data: products, error } = await query

  if (error) {
    console.error('Error fetching products:', error)
  }

  // The list of categories for our filter buttons
  const categories = ['All', 'Men', 'Women', 'Accessories', 'Summer Collection']

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <header className="bg-gray-50 py-16 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">New Arrivals</h2>
        <p className="text-lg text-gray-600">Discover the latest pieces from our independent sellers.</p>
      </header>

      {/* Category Filter Bar */}
      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={cat === 'All' ? '/' : `/?category=${cat}`}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  (currentCategory === cat) || (!currentCategory && cat === 'All')
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group flex flex-col">
                
                {/* Clickable Image & Title */}
                <Link href={`/product/${product.id}`}>
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="h-80 w-full object-cover object-center group-hover:opacity-75 transition-opacity"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                </Link>
                
                <div className="flex justify-between items-center mt-1">
                  <p className="text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                    {product.category}
                  </span>
                </div>
                
                {/* Add to Cart */}
                <div className="mt-auto pt-2">
                  <AddToCartButton product={product} />
                </div>
                
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No products found in this category.</p>
          </div>
        )}
      </main>
    </div>
  )
}