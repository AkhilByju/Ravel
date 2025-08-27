"use client"

import React from 'react'
import Link from 'next/link'
import { avatarPlaceholderUrl, navItems } from '@/constants'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import path from 'path'

interface Props {
    fullName: string;
    avatar: string;
    email: string;
}

const Sidebar = ({ email, fullName, avatar }: Props) => {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <Link href="/">
      Logo
      </Link>  

      <nav className='sidebar-nav'>
        <ul className='flex flex-1 flex-col gap-6'>
            {navItems.map(({ url, name, icon }) => (
                <Link key={name} href={url} className='lg:w-full'>
                    <li className={cn("sidebar-nav-item", pathname === url && "shad-active")}>
                        <Image 
                            src={icon}
                            alt={name}
                            width={24}
                            height={24}
                            className={cn("nav-icon", pathname === url && "nav-icon-active")}
                        />
                        <p className='text-brand-100, hidden lg:block'>{name}</p>
                    </li>
                </Link>
            ))}
        </ul>
      </nav>

      <div className="sidebar-user-info">
          <Image
              src={avatar}
              alt="Avatar"
              width={44}
              height={44}
              className="sidebar-user-avatar"
          />
          <div className='hidden lg:block'>
            <p className='subtitle-2 capitalize'>{fullName}</p>
            <p className="caption">{email}</p>
          </div>
      </div>
    </aside>
  )
}

export default Sidebar