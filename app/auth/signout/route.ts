import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  
  // Tell Supabase to securely destroy the session/cookies
  await supabase.auth.signOut()

  // Redirect the user back to the public storefront (homepage)
  return NextResponse.redirect(new URL('/', request.url), {
    status: 302, // 302 means "temporary redirect"
  })
}