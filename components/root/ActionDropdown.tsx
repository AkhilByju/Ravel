"use client"

import React, { use } from 'react'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import { Models } from 'node-appwrite'
import { actionsDropdownItems } from '@/constants'
import Link from 'next/link'
import { constructDownloadUrl } from '@/lib/utils'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { deleteFile, renameFile, updateFileUsers } from '@/lib/actions/file.actions'
import { usePathname } from 'next/navigation'
import { FileDetails } from './ActionsModalContent'
import { ShareInput } from './ActionsModalContent'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TooltipProvider } from '@radix-ui/react-tooltip'

const ActionDropdown = ({file}: {file: Models.Document}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [action, setAction] = useState<ActionType | null>(null);
    const [name, setName] = useState(file.name);
    const [isLoading, setIsLoading] = useState(false);
    const [emails, setEmails] = useState<string[]>([]);
    

    const path = usePathname();

    const closeAllModals = () => {
        setIsModalOpen(false);
        setIsDropdownOpen(false);
        setAction(null);
        setName(file.name);
    }
    
    const handleAction = async () => {
        if (!action) return 
        setIsLoading(true);
        let success = false;

        const actions = {
            rename: () => renameFile({fileId: file.$id, name, extension: file.extension, path}),
            share: () => updateFileUsers({fileId: file.$id, emails, path}),
            delete: () => deleteFile({ fileId: file.$id, bucketFileId: file.bucketFileId, path }),
        };

        success = await actions[action.value as keyof typeof actions]();

        if(success) closeAllModals();

        setIsLoading(false)
    }

    const handleRemoveUser = async (email: string) => {
        const updatedEmails = emails.filter((e) => e !== email);

        const success = await updateFileUsers({
            fileId: file.$id,
            emails: updatedEmails,
            path
        });

        if (success) setEmails(updatedEmails);
        closeAllModals();
    }

    const renderDialogContent = () => {
        if (!action) return null;

        const { value, label } = action;
        return (
            <DialogContent className=' w-full max-w-lg rounded-3xl border border-white/10
                bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl
                ring-1 ring-white/10 text-slate-100'>
                <DialogHeader className='flex flex-col gap-4'>
                    <DialogTitle className='text-center text-xl font-extrabold
        bg-gradient-to-r from-indigo-300 to-fuchsia-300
        bg-clip-text text-transparent'>{label}</DialogTitle>
                    {value === "rename" && (
                        <Input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='h-12 rounded-2xl
                            border border-white/15 bg-white/10
                            px-4 text-sm text-white placeholder:text-white/50
                            shadow-inner backdrop-blur
                            focus-visible:outline-none
                            focus-visible:ring-2 focus-visible:ring-indigo-500/40
                            focus-visible:border-white/25'
                        />
                    )}
                    {value === "details" && <FileDetails file={file}/>}
                    {value === "share" && (
                        <ShareInput file={file} onInputChange={setEmails} onRemove={handleRemoveUser}/> 
                    )}
                    {value === "delete" && (
                        <p className='text-center text-white'>
                            Are you sure you want to delete{` `}
                            <span className='font-medium text-lg text-rose-500'>
                                {file.name}
                            </span>?
                        </p>
                    )}
                </DialogHeader>
                {['rename', 'delete', 'share'].includes(value) && (
                    <DialogFooter className='mt-2 flex flex-col gap-3 md:flex-row md:justify-center'>
                        <Button onClick={closeAllModals} className='h-11 w-full md:w-40 rounded-2xl
                            border border-white/15 bg-white/10 text-white/90
                            hover:bg-white/15'
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleAction} className='h-11 w-full md:w-40 rounded-2xl font-semibold text-white
                            bg-gradient-to-r from-indigo-500 to-fuchsia-500
                            shadow-lg ring-1 ring-white/20
                            hover:from-indigo-600 hover:to-fuchsia-600'
                        >
                            <p className='capitalize'>{value}</p>
                            {isLoading && (
                                <Image
                                src="/assets/icons/loader.svg"
                                alt="loader"
                                width={24}
                                height={24}
                                className='animate-spin'
                                />
                            )}
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        )
    }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger className='shad-no-focus pt-2'>
                <Image
                src="/assets/icons/dots.svg"
                alt="dots"
                width={24}
                height={24}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="
                    inline-block rounded-2xl p-px
                    bg-[conic-gradient(from_180deg_at_50%_50%,rgba(99,102,241,0.6),rgba(217,70,239,0.6),rgba(99,102,241,0.6))]
                    shadow-2xl text-white"
            >
                <div className="w-72 rounded-[inherit] bg-[#0b1220] p-1.5 ring-1 ring-indigo-400/30">
                <DropdownMenuLabel  className="
                    mx-1 mb-1 truncate rounded-xl
                    bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20
                    px-3 py-2 text-sm font-semibold text-indigo-100
                    ring-1 ring-indigo-400/30"
                >
                    <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>{file.name}</TooltipTrigger>
                        <TooltipContent>
                            {file.name}
                        </TooltipContent>
                    </Tooltip>
                    </TooltipProvider>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-1 h-px bg-gradient-to-r from-indigo-400/40 to-fuchsia-400/40"/>
                {actionsDropdownItems.map((actionItem) => (
                    <DropdownMenuItem 
                    key={actionItem.value} 
                    onClick={() => {
                        setAction(actionItem);

                        if(["rename", "share", "delete", "details"].includes(actionItem.value)) {
                            setIsDropdownOpen(false);
                            setIsModalOpen(true);
                        }
                        }}
                        className="
                            group relative flex items-center gap-2 rounded-xl px-3 py-2 text-sm
                            text-white cursor-pointer
                            hover:bg-indigo-500/10 focus:bg-indigo-500/10 data-[highlighted]:bg-indigo-500/10
                            /* force white on focus/keyboard + highlighted */
                            focus:!text-white data-[highlighted]:!text-white
                        "
                    >
                        {actionItem.value === "download" ? 
                        <Link 
                            href={constructDownloadUrl(file.bucketFileId)}
                            download={file.name}
                            className='flex items-center gap-2 text-white hover:text-slate-100'
                        >
                            <Image 
                                src={actionItem.icon}
                                alt={actionItem.label}
                                width={30}
                                height={30}
                                className="
                                    h-7 w-7 rounded-lg p-1
                                    bg-gradient-to-br from-indigo-500/25 to-fuchsia-500/25
                                    ring-1 ring-indigo-400/30
                                "
                            />
                            {actionItem.label}
                        </Link> : 
                        <div className='flex items-center gap-2'>
                            <Image 
                                src={actionItem.icon}
                                alt={actionItem.label}
                                width={30}
                                height={30}
                                className="
                                    h-7 w-7 rounded-lg p-1
                                    bg-gradient-to-br from-indigo-500/25 to-fuchsia-500/25
                                    ring-1 ring-indigo-400/30
                                "
                                />
                            {actionItem.label}
                        </div>}
                    </DropdownMenuItem>
                ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>

        {renderDialogContent()}
    </Dialog>
  )
}

export default ActionDropdown