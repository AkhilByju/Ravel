import React from 'react'
import Image from 'next/image'
import FeatureChip from '@/components/auth/FeatureChip'
import TrustBar from '@/components/auth/TrustBar';
import MiniCard from '@/components/auth/MiniCard';
import { Shield, Sparkles, Search, Cloud } from "lucide-react";
import SplitText from '@/components/ReactBits/SplitText';

const Layout = ({ children}: {children: React.ReactNode}) => {

  return (
    <div className='flex min-h-screen'>
        <section className="relative lg:w-1/2 p-10 lg:p-14 text-slate-100 bg-gradient-to-br from-slate-950 via-indigo-700 to-fuchsia-500 hidden md:block">
            <div className='flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12'>
                <div className='space-y-5 text-brand relative'>
                    <h1 className='h1 tracking-tight'>The best way to manage your files</h1>
                    <p className='body-1 max-w-md'>
                        This is a place where you can store all your documents
                    </p>
                </div>
            </div>
            <div className="mt-8 space-y-6 relative">
              <div className="grid grid-cols-2 gap-3 max-w-sm">
                <FeatureChip icon={Shield}   label="Zero-knowledge encryption" />
                <FeatureChip icon={Sparkles} label="AI tagging" />
                <FeatureChip icon={Search}   label="Semantic search" />
                <FeatureChip icon={Cloud}    label="Instant sync" />
              </div>

              <TrustBar />
              <MiniCard />
            </div>
        </section>
        <section className='flex flex-1 flex-col items-center bg-brand p-4 py-10 lg:justify-center lg:p-10 lg:py-0'>
            {children}
        </section>
    </div>
  )
}

export default Layout;