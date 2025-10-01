import React, {useState} from 'react'
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
import { streamAI } from '@/hooks/useOllama'

const AskAI = () => {
    const [query, setQuery] = useState('');
    const [answer, setAnswer] = useState('');
    
    
    const handleAsk = async () => {
        setAnswer(''); // Reset Answer
        for await (const chunk of streamAI([{role: "user", content: query}], 'gpt-5-nano')) {
          setAnswer((prev) => prev + chunk);
        }
      }


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
                    {answer ? (
                        <div className="
                            mb-6 max-w-[75%] self-start
                            rounded-2xl border border-white/20 
                            bg-gradient-to-r from-slate-800/90 to-slate-900/70
                            p-4 text-sm leading-relaxed text-slate-100
                            shadow-lg backdrop-blur-md
                            animate-fadeIn
                            ">
                            <p
                            className="
                                w-fit inline-block text-2xl font-bold tracking-wide
                                bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-indigo-400
                                bg-[length:300%_100%] bg-clip-text text-transparent
                                [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]
                                animate-gradient-move
                            "
                            >
                            Ravel AI Assistant:
                            </p>

                                <p>{answer}</p>
                            </div>) : 
                        <>
                            <DrawerTitle>
                                <span className="                                w-fit inline-block text-2xl font-bold tracking-wide
                                bg-gradient-to-r from-indigo-500 via-fuchsia-400 to-indigo-500
                                bg-[length:300%_100%] bg-clip-text text-transparent
                                [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]
                                animate-gradient-move">
                                        Ravel AI Assistant
                                </span>
                            </DrawerTitle>
                            <DrawerDescription className="text-slate-300">Ask any questions relating to your documents</DrawerDescription>
                        </>
                    }
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
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAsk}
                        />
                </div>
                <DrawerFooter className="flex gap-2">
                    <Button className={cn(
                        "rounded-xl px-4 py-2.5 font-medium my-2",
                        "bg-gradient-to-r from-indigo-500 via-indigo-300 to-fuchsia-500"
                        )}
                        onClick={handleAsk}
                        >
                            Send Message
                    </Button>
                    <DrawerClose asChild>
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