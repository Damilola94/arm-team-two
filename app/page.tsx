"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui";

export default function LandingPage() {
  const { user, ready } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-ink text-cream">
      <div className="flex-1 flex flex-col justify-between px-6 py-10">
        <div>
          <p className="font-display uppercase tracking-[0.2em] text-xs text-ember mb-8">
            ARM SAVVY
          </p>
          <h1 className="font-display text-[2.6rem] leading-[1.05] font-semibold">
            Investing,
            <br />
            learned by
            <br />
            <span className="text-ember">doing.</span>
          </h1>
          <p className="mt-6 text-cream/70 text-base leading-relaxed max-w-xs">
            ARM One, reimagined. An AI guide, a habit you'll actually keep,
            and friends who make it normal — starting from{" "}
            <span className="text-cream font-medium">₦500</span>.
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-plum rounded-xl2 py-4 px-2">
              <p className="font-display text-lg font-semibold text-ember">₦500</p>
              <p className="text-[11px] text-cream/60 mt-1">to start</p>
            </div>
            <div className="bg-plum rounded-xl2 py-4 px-2">
              <p className="font-display text-lg font-semibold text-magenta">Ammy</p>
              <p className="text-[11px] text-cream/60 mt-1">AI guide</p>
            </div>
            <div className="bg-plum rounded-xl2 py-4 px-2">
              <p className="font-display text-lg font-semibold text-sage">Streaks</p>
              <p className="text-[11px] text-cream/60 mt-1">that pay</p>
            </div>
          </div>

          {ready && user.onboarded ? (
            <Link href="/dashboard" className="block">
              <Button variant="gold" className="w-full py-4 text-base">
                Continue to your dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/onboarding" className="block">
              <Button variant="gold" className="w-full py-4 text-base">
                Get started free
              </Button>
            </Link>
          )}
          <p className="text-center text-[11px] text-cream/40">
            Prototype build — sits on top of ARM's existing fund infrastructure.
          </p>
        </div>
      </div>
    </div>
  );
}
