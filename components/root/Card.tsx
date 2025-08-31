import { Models } from 'node-appwrite'
import React from 'react'
import Link from 'next/link'
import Thumbnail from './Thumbnail'
import { convertFileSize } from '@/lib/utils'
import FormattedDateTime from './FormattedDateTime'
import ActionDropdown from './ActionDropdown'

const Card = ({file}: {file: Models.Document}) => {
  return (
    <Link href={file.url} target='_blank' className="
        group relative rounded-3xl border border-white/10
        bg-white/[0.05] p-5 shadow-2xl backdrop-blur-xl
        transition hover:-translate-y-0.5 hover:border-white/20 hover:shadow-indigo-700/20
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40
        block w-full
      ">
        <div className='flex justify-between gap-4 items-start relative w-full'>
            <Thumbnail type={file.type} extension={file.extension} url={file.url} className='!size-20' imageClassName='!size-11'/>

            <div className='flex flex-col items-end gap-2'>
                <ActionDropdown file={file}/>

                <p className='rounded-lg border border-white/10 bg-white/[0.06] px-2 py-0.5 text-xs font-medium text-white/85 shadow-sm'>{convertFileSize(file.size)}</p>
            </div>
        </div>

        <div className='mt-4'>
            <p className='subtitle-2 line-clamp-1 text-white/90'> {file.name} </p>
            <FormattedDateTime 
            date={file.$createdAt}
            className="body-2 mt-0.5 text-white/70"
            />

            <p className='caption mt-0.5 line-clamp-1 text-white/60'>By: {file.owner.fullName}</p>
        </div>
    </Link>
  )
}

export default Card