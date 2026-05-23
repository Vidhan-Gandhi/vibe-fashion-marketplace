'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addProduct(formData: FormData) {
  const supabase = await createClient()

  // 1. Verify the seller is logged in
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('You must be logged in to upload.')

  // 2. Extract the data from the form
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const price = parseFloat(formData.get('price') as string)
  const category = formData.get('category') as string
  const image = formData.get('image') as File

  // 3. Upload the image to our Supabase Storage bucket
  const fileExt = image.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  
  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(fileName, image)

  if (uploadError) {
    console.error("Upload error:", uploadError)
    throw new Error('Failed to upload image.')
  }

  // 4. Get the public URL of the image we just uploaded
  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName)

  // 5. Save the product details to our database table
  const { error: dbError } = await supabase.from('products').insert({
    seller_id: user.id,
    title,
    description,
    price,
    category,
    image_url: publicUrl,
  })

  if (dbError) {
    console.error("Database error:", dbError)
    throw new Error('Failed to save product to database.')
  }

  // 6. Refresh the page so the seller can upload another item
  revalidatePath('/dashboard')
}