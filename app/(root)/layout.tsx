import Sidebar from '@/components/root/Sidebar'
import MobileNavigation from '@/components/root/MobileNavigation'
import Header from '@/components/root/Header'
import React from 'react'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import { Toaster } from "@/components/ui/toaster"
import { Separator } from '@/components/ui/separator'

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const layout = async ({children}: {children: React.ReactNode}) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return redirect('/sign-in');

  return (
    <main className="flex h-screen bg-black">
      <Sidebar {...currentUser} />

      <section
      className="
          relative flex h-full flex-1 flex-col overflow-y-auto
          [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]
        "
        style={{
          backgroundImage: `
            radial-gradient(40rem 24rem at 15% 20%, rgba(99,102,241,0.18), transparent 60%),
            radial-gradient(36rem 22rem at 85% 35%, rgba(217,70,239,0.18), transparent 60%),
            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: 'auto, auto, 40px 40px, 40px 40px',
          backgroundPosition: 'center, center, 0 0, 0 0',
          backgroundBlendMode: 'screen, screen, normal, normal'
        }}>
        <MobileNavigation {...currentUser} />
        <Header userId={currentUser.$id} accountId={currentUser.accountId} />
        <div className="main-content mx-6 space-y-6">{children}</div>
      </section>

      <Toaster />
    </main>
  )
}

export default layout
