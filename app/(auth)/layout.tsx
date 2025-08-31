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
      <section
        className="
          relative flex flex-1 items-center justify-center
          bg-slate-950 p-6 lg:p-10
          overflow-hidden
        "
      >
        {/* background aurora glows */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
          <div className="absolute right-[-10%] top-[-10%] h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_60%)] blur-3xl" />
          <div className="absolute left-[-8%] bottom-[-12%] h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.18),transparent_60%)] blur-3xl" />
        </div>

        {/* glass panel that wraps your auth form */}
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
          {children}
        </div>
      </section>
    </div>
  )
}

export default Layout;