"use client"

import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Button } from '../ui/button'
import { cn, convertFileToUrl } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'
import { getFileType } from '@/lib/utils'
import Thumbnail from './Thumbnail'

import { Zoomies } from 'ldrs/react'
import 'ldrs/react/Zoomies.css'
import { MAX_FILE_SIZE } from '@/constants'

import { useToast } from "@/hooks/use-toast"
import { uploadFile } from '@/lib/actions/file.actions'
import { usePathname } from 'next/navigation'

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

interface Props {
  ownerId: string;
  accountId: string;
  className?: string;
}

const FileUploader = ({ ownerId, accountId, className} : Props) => {
  const path = usePathname();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);


  const onDrop = useCallback( async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);

    const uploadPromises = acceptedFiles.map(async (file) => {
      if (file.size > MAX_FILE_SIZE) {
        setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));

        return toast({
          description: (
          <p className='body-2 text-white'>
            <span className='font-semibold'>
              {file.name}
            </span> is too large. Max file is 50 MB
          </p>), 
          className: "error-toast"
        });
      }

      return uploadFile({file, ownerId, accountId, path}).then((uploadedFile) => {
        if (uploadedFile) {
          setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
        }
      });
    })

    await Promise.all(uploadPromises)
  }, [ownerId, accountId, path])

  const {getRootProps, getInputProps} = useDropzone({onDrop})

  const handleRemoveFile = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, fileName: string) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName))
  }

  return (
    <div {...getRootProps()} className='cursor-pointer '>
      <input {...getInputProps()} />
      <Button
        type="button"
        className={cn(
          "w-full flex items-center justify-center gap-2", // match sidebar buttons
          "rounded-2xl px-5 py-3", // bigger padding = matches Logout
          "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-medium",
          "shadow-sm ring-1 ring-indigo-400/30",
          "transition hover:opacity-90 focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:ring-offset-2",
          className
        )}
      >
        <Image
          src="assets/icons/upload.svg"
          alt="upload"
          width={22}
          height={22}
          className="drop-shadow-[0_0_4px_rgba(129,140,248,0.6)]"
        />
        <p className="text-base">Upload</p>
      </Button>

      {files.length > 0 && (
        <ul className='uploader-preview-list'>
          <h4 className='h4 bg-gradient-to-r from-indigo-300 to-fuchsia-300 bg-clip-text text-transparent'>
            Uploading
          </h4>

          {files.map((file, index) => {
            const {type, extension } = getFileType(file.name);

            return (
              <li key={`${file.name}-${index}`} className='uploader-preview-item'>
                <div className='flex items-center gap-3 min-w-0'>
                  <Thumbnail 
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(file)}
                  />

                  <div className='flex flex-col min-w-0'>
                    <p className="text-base font-semibold text-slate-100 truncate max-w-[200px]"> {file.name} </p>
                    <p className="text-xs text-slate-300 truncate max-w-[200px]"> {formatBytes(file.size)} </p>
                    <Zoomies
                      size="80"
                      stroke="5"
                      bgOpacity="0.1"
                      speed="1.4"
                      color="white" 
                    />
                  </div>
                </div>

                <Image
                  src="/assets/icons/remove.svg"
                  alt="remove"
                  width={24}
                  height={24}
                  className='cursor-pointer opacity-80 hover:opacity-100 hover:scale-105 transition'
                  onClick={(e) => handleRemoveFile(e, file.name)}
                />
              </li>
            )
          })}

        </ul>
      )} 
    </div>
  )
}

export default FileUploader