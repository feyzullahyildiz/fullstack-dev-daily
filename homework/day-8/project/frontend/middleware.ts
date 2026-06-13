import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Bu dosya her istekte çalışır. 
// Matcher ile sadece belirli yollarda çalışmasını sağlayacağız.

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')

  // LOG: Hangi sayfaya gidiliyor?
  console.log(`Middleware çalıştı: ${request.nextUrl.pathname}`)

  // ÖDEV: Eğer gidilen yol '/dashboard' ile başlıyorsa 
  // ve token yoksa, kullanıcıyı ana sayfaya ('/') yönlendir.
  // İPUCU: request.nextUrl.pathname.startsWith('/dashboard')
  
  // Önemli: Redirect yaparken tam URL vermelisiniz:
  // return NextResponse.redirect(new URL('/', request.url))

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/dashboard/:path*',
  ],
}
