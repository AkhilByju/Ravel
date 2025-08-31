import React from 'react'
import Image from 'next/image'
import { getFileIcon } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface Props {
    type: string,
    extension: string,
    url?: string,
    imageClassName?: string,
    className?: string,
}

const Thumbnail = ({ type, extension, url = "", imageClassName, className}: Props) => {
    const isImage = type === "image" && extension !== "svg";

  return (
    <figure className={cn(
        'relative flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-inner backdrop-blur-sm',
        'overflow-hidden',
        className
      )}>
        <Image
        src={isImage ? url : getFileIcon(extension, type)}
        alt="thumbnail"
        width={100}
        height={100}
        className={cn('size-8 object-contain', imageClassName, isImage && 'thumbnail-image')}
         />
         <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 transition-opacity opacity-60 group-hover:opacity-100"/>
    </figure>
  )
}

export default Thumbnail