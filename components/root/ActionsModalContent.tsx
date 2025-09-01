import { Models } from 'node-appwrite'
import React from 'react'
import Thumbnail from './Thumbnail'
import FormattedDateTime from './FormattedDateTime'
import { convertFileSize, formatDateTime } from '@/lib/utils'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Image from 'next/image'

const ImageThumbnail = ({file}: {file: Models.Document}) => (
    <div className='flex items-center gap-3 rounded-2xl
      border border-white/10 bg-white/[0.08] p-3
      ring-1 ring-white/10 shadow-inner backdrop-blur'>
        <Thumbnail type={file.type} extension={file.extension} url={file.url} className='!size-10 rounded-xl bg-white/10 ring-1 ring-white/15 grid place-items-center'/>
        <div className='min-w-0'>
            <p className='text-sm font-semibold text-white/95 truncate'>{file.name}</p>
            <FormattedDateTime date={file.$createdAt}  className='text-left text-sm text-white/60'/>
        </div>
    </div>
)

const DetailsRow = ({label, value}: {label: string, value:string}) => {
    return (
        <div className='grid grid-cols-[120px_1fr] items-center gap-3 py-2 first:pt-0 last:pb-0'>
            <p className='text-sm text-white/60 text-left'>{label}</p>
            <p className='text-sm font-medium text-white text-left'>{value}</p>
        </div>
    )
}

export const FileDetails = ({file}: {file: Models.Document}) => {
  return (
    <>
        <ImageThumbnail file={file} />
        <div className='mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 ring-1 ring-white/10'>
            <DetailsRow label="Format:" value={file.extension} />
            <DetailsRow label="Size:" value={convertFileSize(file.size)} />
            <DetailsRow label="Owner:" value={file.owner.fullName} />
            <DetailsRow label="Last Edit:" value={formatDateTime(file.$updatedAt)} />
        </div>
    </>
  )
}


interface Props{
    file: Models.Document,
    onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
    onRemove: (email: string) => void,
}

export const ShareInput = ({ file, onInputChange, onRemove} : Props) => {
  return (
    <>
        <ImageThumbnail file={file}/>

        <div className='share-wrapper'>
            <p className='subtitle-2 pl-1 text-light-100'>Share file with other users</p>

            <Input
            type='email'
            placeholder='Enter email adress'
            onChange={e => onInputChange(e.target.value.trim().split(','))}
            className='share-input-field'
            />

            <div className='pt-4'>
                <div className='flex justify-between'>
                    <p className='subtitle-2 text-light-100'>Shared with</p>
                    <p className='subtitle-2 text-light-200'>{file.users.length} user</p>
                </div>

                <ul className='pt-2'>
                    {file.users.map((email: string) =>(
                        <li key={email} className='flex items-center justify-between gap-2'>
                            <p className='subtitle-2'>{email}</p>
                            <Button onClick={() => onRemove(email)} className='share-remove-user'>
                                <Image
                                src="/assets/icons/remove.svg"
                                alt="remove"
                                width={24}
                                height={24}
                                className="remove-con"
                                />
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </>
  )
}