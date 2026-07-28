"use client";

import { useStore } from "@/lib/store";
import { Flame, Gem } from "lucide-react";

export function TopBar({ title }: { title: string }) {
  const { user } = useStore();
  return (
    <div className="sticky top-0 z-30 bg-cream/95 backdrop-blur border-b border-sand">
      <div className="mx-auto max-w-md px-5 py-4 flex items-center justify-between">
        <h1 className="font-display text-xl font-semibold text-ink">{title}</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-ember font-display font-semibold text-sm">
            <Flame size={16} className="fill-ember/20" />
            {user.streak}
          </div>
          <div className="flex items-center gap-1 text-magenta font-display font-semibold text-sm">
            <Gem size={15} />
            {user.points}
          </div>
        </div>
      </div>
    </div>
  );
}
