"use client"

import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Separator } from '../ui/separator';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { navItems } from '@/constants';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import FileUploader from './FileUploader';

interface Props {
  ownerId: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}

const MobileNavigation = ({ ownerId, accountId, fullName, avatar, email}: Props) => {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <div>
    <header className='mobile-header'>
        Logo
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger> 
            <Image src="/assets/icons/menu.svg" alt="Menu" width={30} height={30}/>
          </SheetTrigger>

        <SheetContent className='shad-sheet h-screen px-3 bg-gradient-to-tr from-indigo-900 via-indigo-700 to-fuchsia-700'>
            <SheetTitle>
              <div className='header-user'>
                <Image src={avatar} alt="Avatar" width={44} height={44} className='header-user-avatar'/>
                <div className='sm:hidden md:block lg:hidden'>
                  <p className='subtitle-2 capitalize text-slate-200'> {fullName}</p>
                  <p className='caption text-slate-200'>{email}</p>
                </div>
              </div>
              <Separator className='mb-4 bg-light-200/20'/>
            </SheetTitle>
            <nav className='mobile-nav'>
              <ul className='mobile-nav-list'>
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
                        <p>{name}</p>
                    </li>
                </Link>
            ))}
              </ul>
            </nav>

            <Separator className='my-5 bg-light-200/20'/>

            <div className='flex flex-col justify-between gap-5 pb-5'>
              <FileUploader />

            <Button type='submit' className='mobile-sign-out-button border border-slate-600' onClick={() => {}}>
                    <Image 
                        src="/assets/icons/logout.svg"
                        alt="Logout"
                        width={24}
                        height={24}
                    />
                    <p>Logout</p>
                </Button>
            </div>
        </SheetContent>
      </Sheet>
    </header>
    </div>
  )
}

export default MobileNavigation