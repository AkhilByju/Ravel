import React from 'react'

const ImportantPins = () => {
  return (
    <div className="mx-4 my-3">
        <p className="mb-2 text-xs uppercase tracking-wide text-white/60">Pinned</p>
        <ul className="space-y-2">
            {[
            { name: "Cap Table.xlsx", icon: "📊" },
            { name: "Brand Guidelines.pdf", icon: "📕" },
            ].map((f) => (
            <li key={f.name} className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10">
                <span className="text-base">{f.icon}</span>
                <span className="truncate">{f.name}</span>
            </li>
            ))}
        </ul>
    </div>
  )
}

export default ImportantPins