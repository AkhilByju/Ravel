import Sidebar from '@/components/root/Sidebar'
import MobileNavigation from '@/components/root/MobileNavigation'
import Header from '@/components/root/Header'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className='flex h-screen'>
        <Sidebar />

        <section className='flex h-full flex-1 flex-col'>
            <MobileNavigation />
            <Header />

            <div className='main-content'>{children}</div>
        </section>
    </main>
  )
}

export default layout