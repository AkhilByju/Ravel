import Sidebar from '@/components/root/Sidebar'
import MobileNavigation from '@/components/root/MobileNavigation'
import Header from '@/components/root/Header'
import React from 'react'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'

const layout = async ({children}: {children: React.ReactNode}) => {
    const currentUser = await getCurrentUser();

    if(!currentUser) return redirect('/sign-in');

  return (
    <main className='flex h-screen'>
        <Sidebar {...currentUser} />

        <section className='flex h-full flex-1 flex-col'>
            <MobileNavigation />
            <Header />

            <div className='main-content'>{children}</div>
        </section>
    </main>
  )
}

export default layout