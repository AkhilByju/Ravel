"use client"

import React from 'react'
import Link from 'next/link'
import { avatarPlaceholderUrl, navItems } from '@/constants'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import path from 'path'
import AskAI from './AskAI'
import ImportantPins from './ImportantPins'

interface Props {
    fullName: string;
    avatar: string;
    email: string;
}

const Sidebar = ({ email, fullName, avatar }: Props) => {
  const pathname = usePathname();

  return (
    <aside className={cn(
        "relative hidden h-screen w-72 shrink-0 md:flex md:flex-col",
        "border-r border-white/10 bg-gradient-to-br from-slate-950 via-indigo-700 to-fuchsia-500 text-slate-100"
    )}>
    <div
        aria-hidden
        className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        // layered “nebula” glows
        "[background:radial-gradient(120px_100px_at_15%_8%,rgba(99,102,241,0.35),transparent_60%),",
        "radial-gradient(180px_140px_at_85%_6%,rgba(236,72,153,0.28),transparent_60%),",
        "radial-gradient(200px_140px_at_20%_92%,rgba(236,72,153,0.24),transparent_60%)]",
        "opacity-70"
        )}
    />
    <div
        aria-hidden
        className={cn(
        "pointer-events-none absolute inset-0 opacity-25",
        // tiny star noise
        "bg-[radial-gradient(1px_1px_at_20px_30px,rgba(255,255,255,0.7)_1px,transparent_1px)]",
        "[background-size:24px_24px]"
        )}
    />

    <Link href="/">
        <div className={cn(
            "relative z-10 mx-4 mt-4 mb-2 flex items-center gap-3 rounded-2xl",
            "bg-white/5 px-2 py-3 backdrop-blur",
            "border border-white/10 shadow-inner"
        )}
        >
        <div className={cn("h-8 w-8 rounded-lg", "bg-gradient-to-tr from-indigo-600 via-indigo-400 to-fuchsia-500")}></div>
        <span className="text-base font-semibold tracking-tight">
        <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">
            Ravel
        </span>{" "}
        </span>
        </div>
    </Link>

      <nav className='relative z-10 flex-1'>
        <ul className='mt-2 flex flex-col gap-2 px-2'>
            {navItems.map(({ url, name, icon }) => (
                <Link key={name} href={url} className='lg:w-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 rounded-xl'>
                    <li
                    className={cn(
                        "flex items-center gap-3 rounded-2xl px-4 py-2.5 transition h-16",
                        pathname === url 
                        ? "bg-white/90 text-slate-900 ring-1 ring-indigo-400/30 shadow-sm"
                        : "text-slate-200 hover:bg-white/5"
                    )}
                    >
                        <Image 
                            src={icon}
                            alt={name}
                            width={24}
                            height={24}
                            className={cn(
                            "h-[22px] w-[22px] transition",
                            pathname === url
                                ? "brightness-0"
                                : ""
                            )}
                        />
                        <p className={cn('text-slate-200 hidden lg:block font-medium', pathname === url ? "text-slate-900" : "")}>{name}</p>
                    </li>
                </Link>
            ))}
        </ul>
      </nav>

    {/* Ask Ravel AI */}
    <AskAI />


    <div className="relative z-10 m-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur">
        <div className="flex items-center gap-3">
            <img
            src={avatar}
            alt="Avatar"
            width={44}
            height={44}
            className="h-11 w-11 rounded-xl object-cover ring-2 ring-indigo-400/40"
            />
            <div className="hidden min-w-0 lg:block">
            <p className="truncate text-sm font-semibold text-slate-100 capitalize">{fullName}</p>
            <p className="truncate text-xs text-slate-400">{email}</p>
            </div>
        </div>
    </div>
    </aside>
  )
}

export default Sidebar