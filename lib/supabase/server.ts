"use server";

import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function supabaseServer() {
  const cookieStore = cookies();

  const setCookie = (name: string, value: string, options: CookieOptions) => {
    try {
      // Only works in mutable contexts; otherwise no-op
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cookieStore.set({ name, value, ...options });
    } catch {}
  };

  const removeCookie = (name: string, options: CookieOptions) => {
    try {
      // @ts-ignore
      cookieStore.set({ name, value: "", ...options, maxAge: 0 });
    } catch {}
  };

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // @ts-ignore
        get: (name) => cookieStore.get(name)?.value,
        set: setCookie,
        remove: removeCookie,
      },
    }
  );
}
