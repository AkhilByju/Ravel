"use client";
import { getStats } from "@/lib/actions/stats.actions";
import React from "react";

function bytesToHuman(b: number) {
  if (!b) return "0 B";
  const u = ["B","KB","MB","GB","TB","PB"];
  const i = Math.floor(Math.log(b)/Math.log(1024));
  return `${(b/1024**i).toFixed(1)} ${u[i]}`;
}

export default function StatsCard() {
  const [data, setData] = React.useState<{totalFiles:number; totalSpace:number; recentActivity:number} | null>(null);

  React.useEffect(() => {
    (async () => {
      const res = await getStats();
      setData(res);
      console.log(res);
    })();
  }, []);

  const items = data ? [
    { label: "Total Files", value: data.totalFiles.toLocaleString() },
    { label: "Total Space", value: bytesToHuman(data.totalSpace) },
    { label: "Recent Activity (7d)", value: data.recentActivity.toLocaleString() },
  ] : [
    { label: "Total Files", value: "—" },
    { label: "Total Space", value: "—" },
    { label: "Recent Activity (7d)", value: "—" },
  ];

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      {items.map((s) => (
        <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-inner">
          <p className="text-[10px] font-semibold tracking-widest text-white/55">{s.label.toUpperCase()}</p>
          <p className="mt-2 text-xl font-bold text-white/90">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
