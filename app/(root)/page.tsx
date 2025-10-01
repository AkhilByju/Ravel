"use client";

import React, { useState } from 'react';
import { streamAI } from '@/hooks/useOllama';
import StatsCard from '@/components/root/StatsCard';

export default function Home() {
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
      <section className="relative flex w-full items-center justify-center px-6 py-16 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900">
        {/* background nebula glows */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
          <div className="absolute left-[10%] top-[70%] h-[240px] w-[240px] rounded-full bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.22),transparent_60%)] blur-3xl" />
          <div className="absolute right-[20%] top-[10%] h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.22),transparent_60%)] blur-3xl" />
        </div>

        {/* glass panel */}
        <div className="relative max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-slate-100 backdrop-blur-xl shadow-2xl">
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[linear-gradient(120deg,rgba(255,255,255,0.16),rgba(255,255,255,0)_35%)]" />
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-300 via-indigo-200 to-fuchsia-300 bg-clip-text text-transparent">
              Ravel — The Only Storage Solution You Need
            </span>
          </h2>
          <p className="mt-3 text-white/75 leading-relaxed">
            Ask, search, summarize, and organize across everything you’ve stored. Your AI teammate with glass-smooth UX and deep context.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button className="rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-2.5 font-semibold text-white shadow-lg ring-1 ring-white/20 transition hover:translate-y-[-1px] hover:shadow-indigo-700/30">
              Start AI Session
            </button>
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
        </div>
      </section>

      <div className="relative mx-6 rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl shadow-xl">
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[linear-gradient(to_top,rgba(255,255,255,0.12),transparent_55%)]" />

          {answer && (
              <div className="
                mb-6 max-w-[75%] self-start
                rounded-2xl border border-white/10 
                bg-gradient-to-r from-slate-800/70 to-slate-900/70
                p-4 text-sm leading-relaxed text-slate-100
                shadow-lg backdrop-blur-md
                animate-fadeIn
              ">
                <p className='heading'>Ravel AI: </p>
                <p>{answer}</p>
              </div>
          )}
        
        {/* search row */}
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 shadow-inner">
          <svg className="h-5 w-5 text-white/50" fill="none" viewBox="0 0 24 24">
            <path d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            placeholder="Ask anything about your docs…"
            className="w-full bg-transparent text-sm text-slate-100 placeholder:text-white/50 focus:outline-none"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          />
          <button
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:opacity-90"
            onClick={handleAsk}
          >
            Ask
          </button>
        </div>

        {/* stat cards */}
        <StatsCard />

        {/* Quick actions */}
        <div className="mt-6 flex flex-wrap gap-2">
          {["Summarize PDFs", "Find contracts", "Create brief"].map((q) => (
            <button
              key={q}
              className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-white/85 shadow-sm backdrop-blur transition hover:border-white/20 hover:bg-white/[0.09]"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
