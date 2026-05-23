import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { addProduct } from './actions'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Welcome, <span className="font-semibold text-black">{user.email}</span>!
            </p>
          </div>
          <form action="/auth/signout" method="post">
            <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black">
              Sign Out
            </button>
          </form>
        </div>
        
        {/* Upload Form */}
        <div className="mt-8 rounded-xl bg-white p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-6">Add New Product</h2>
          
          <form action={addProduct} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Title</label>
              <input type="text" name="title" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-black sm:text-sm" placeholder="e.g., Vintage Denim Jacket" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-black sm:text-sm" placeholder="Describe the material, fit, and style..."></textarea>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                <input type="number" step="0.01" name="price" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-black sm:text-sm" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select name="category" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-black sm:text-sm">
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Summer Collection">Summer Collection</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Image</label>
              <input type="file" name="image" accept="image/*" required className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black hover:file:bg-gray-200" />
            </div>
            
            <button type="submit" className="w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
              Upload Product
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}