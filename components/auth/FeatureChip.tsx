import React from 'react'

const FeatureChip = ({ icon: Icon, label }: { icon: any; label: string }) => {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 backdrop-blur-md ring-1 ring-white/15 text-slate-100">
      <Icon className="h-4 w-4" />
      <span className="text-xs leading-none">{label}</span>
    </div>
  )
}

export default FeatureChip