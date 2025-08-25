import React from 'react'

const TrustBar = () => {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-100/80">
      <span>Trusted by</span>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-6 w-16 rounded bg-white/10 ring-1 ring-white/15" />
      ))}
    </div>
  )
}

export default TrustBar