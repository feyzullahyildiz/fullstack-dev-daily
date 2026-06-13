import { NextResponse } from 'next/server';

export async function GET() {
  // Bu bir Route Handler örneğidir. 
  // Sunucu tarafında çalışır ve JSON döner.

  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Task Management API is running',
    environment: process.env.NODE_ENV
  });
}

// ÖDEV: Buraya bir de POST metodu ekleyerek 
// gelen veriyi konsola yazdırmayı deneyebilirsiniz.
