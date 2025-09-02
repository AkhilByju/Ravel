"use client";

import React from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { usePathname, useRouter } from 'next/navigation';
import { sortTypes } from '@/constants';

const Sort = () => {
  const path = usePathname();
  const router = useRouter();

  const handleSort = (value: string) => {
    router.push(`${path}?sort=${value}`);
  }

  return (
    <Select onValueChange={handleSort} defaultValue={sortTypes[0].value}>
      <SelectTrigger
        aria-label="Sort"
        className="
          group h-10 rounded-2xl border border-white/10
          bg-white/[0.06] px-4 text-sm text-white/85 shadow-inner backdrop-blur
          hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/40
          data-[state=open]:ring-2 data-[state=open]:ring-indigo-500/40
        "
      >
        <SelectValue placeholder={sortTypes[0].value}/>
      </SelectTrigger>
      <SelectContent sideOffset={8}
        position="popper"
        className="
          z-50 rounded-2xl border border-white/10 bg-white/[0.06]
          p-1.5 text-white shadow-2xl backdrop-blur-xl
        "
      >
        {sortTypes.map((sort) => (
          <SelectItem 
          key={sort.label} 
          className='
              relative group cursor-pointer select-none rounded-xl
              pl-10 pr-8 py-2 text-sm text-white/85 outline-none transition

              /* hover & keyboard highlight = brighter text */
              hover:bg-white/12 hover:text-black
              data-[highlighted]:bg-white/12 data-[highlighted]:text-black

              /* checked state = subtle gradient tile + bold text */
              data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-indigo-500/15
              data-[state=checked]:to-fuchsia-500/15 data-[state=checked]:text-white
              data-[state=checked]:font-semibold

              /* gradient bar (moved away from text via pl-10) */
              before:absolute before:left-3 before:top-1/2 before:h-5 before:w-[3px]
              before:-translate-y-1/2 before:rounded-full
              before:bg-gradient-to-b before:from-indigo-400 before:to-fuchsia-400
              before:opacity-0 group-hover:before:opacity-100
              data-[highlighted]:before:opacity-100 data-[state=checked]:before:opacity-100
            "
          '
          value={sort.value}
        >
          {sort.label}
        </SelectItem>
        ))
        }
      </SelectContent>
    </Select>
  )
}

export default Sort