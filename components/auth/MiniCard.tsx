import React from 'react'
import { Lock, Zap } from "lucide-react";

const MiniCard = () => {
  return (
    <div className="w-64 rounded-2xl bg-white/10 p-4 backdrop-blur-md ring-1 ring-white/15 shadow-lg">
      <div className="flex items-center justify-between text-slate-100">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-white/20 ring-1 ring-white/15" />
          <div>
            <div className="text-sm font-medium">Quarterly-Report.pdf</div>
            <div className="text-[10px] text-slate-100/80">1.2 MB • 2 days ago</div>
          </div>
        </div>
        <div className="h-2 w-6 rounded-full bg-white/40" />
      </div>
      <div className="mt-3 h-24 rounded-lg bg-white/10 ring-1 ring-white/10" />
      <div className="mt-3 flex items-center justify-between text-[10px] text-slate-100/90">
        <span className="flex items-center gap-1"><Lock className="h-3 w-3" />Encrypted</span>
        <span className="flex items-center gap-1"><Zap className="h-3 w-3" />AI tags</span>
      </div>
    </div>
  )
}

export default MiniCard