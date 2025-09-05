import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function GET() {
  const sb = await supabaseServer();
  const { data: { user }, error } = await sb.auth.getUser();

  return NextResponse.json({
    ok: !error,
    user: user ? { id: user.id, email: user.email } : null,
    error: error?.message ?? null,
  });
}
