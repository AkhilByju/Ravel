import React from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

const AskAI = () => {
  return (
    <>
    <div className="mx-4 my-3 rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
        <p className="text-sm font-semibold text-white">Ask Ravel AI</p>
        <p className="mt-1 text-xs text-white/70">
        Try: “Summarize PDFs in /Contracts” 
        </p>
        <Drawer>
            <DrawerTrigger className='my-2 rounded-xl w-full bg-white px-3 py-3 text-bold font-medium text-indigo-700 hover:bg-white/90'>Open AI Panel</DrawerTrigger>
            <DrawerContent     className={cn(
                "rounded-t-2xl border border-white/10",
                "bg-slate-950/80 backdrop-blur-xl",
                "text-slate-100 shadow-lg"
                )}
            >
                <DrawerHeader className='px-5'>
                    <DrawerTitle>
                        <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-fuchsia-400 bg-clip-text text-transparent text-2xl">
                                Ravel AI Assistant
                        </span>
                    </DrawerTitle>
                    <DrawerDescription className="text-slate-300">Ask any questions relating to your documents</DrawerDescription>
                </DrawerHeader>
                <div className='px-4'>
                    <Textarea
                        placeholder="Type your message here"
                        className={cn(
                            "w-full min-h-28 resize-y",                // size & allow vertical resize
                            "rounded-2xl px-4 py-3",                  // comfy density + big radii
                            "bg-white/5 border border-white/10",      // glassy surface + thin border
                            "text-slate-100 placeholder:text-slate-400",
                            "backdrop-blur",                          // subtle blur on dark bg
                            "focus-visible:outline-none",
                            "focus-visible:ring-2 focus-visible:ring-indigo-400/60",
                            "focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                        )}
                        />
                </div>
                <DrawerFooter className="flex gap-2">
                    <Button className={cn(
                        "rounded-xl px-4 py-2.5 font-medium my-2",
                        "bg-gradient-to-r from-indigo-500 via-indigo-300 to-fuchsia-500"
                        )}>
                            Send Message
                    </Button>
                    <DrawerClose>
                        <Button variant="outline">End Session</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </div>
    
    </>
  )
}

export default AskAI