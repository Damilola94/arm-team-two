"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { TopBar } from "@/components/TopBar";
import { StreakRing } from "@/components/StreakRing";
import { Card, Button, ProgressBar, SectionEyebrow } from "@/components/ui";
import { formatNaira } from "@/lib/compound";
import { ArrowRight, Sparkles } from "lucide-react";
import { RequireOnboarded } from "@/components/RequireOnboarded";

export default function DashboardPage() {
  return (
    <RequireOnboarded>
      <DashboardContent />
    </RequireOnboarded>
  );
}

function DashboardContent() {
  const { user, ready } = useStore();

  if (!ready) return null;

  const nextLesson = user.lessons.find((l) => !l.done);
  const primaryGoal = user.goals[0];

  return (
    <div>
      <TopBar title={`Hi ${user.name.split(" ")[0]}`} />
      <div className="px-5 pt-5 space-y-5">
        <Card className="p-5">
          <StreakRing streak={user.streak} weekLog={user.weekLog} />
        </Card>

        <Link href="/wallet" className="block">
          <Card className="p-5 bg-ink text-cream">
            <SectionEyebrow>
              <span className="text-ember">Portfolio</span>
            </SectionEyebrow>
            <p className="font-display text-3xl font-semibold">
              {formatNaira(user.balance)}
            </p>
            <p className="text-cream/60 text-sm mt-1">
              {formatNaira(user.totalInvested)} total invested
            </p>
          </Card>
        </Link>

        {primaryGoal && (
          <Card className="p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="font-display font-semibold text-ink">
                {primaryGoal.emoji} {primaryGoal.name}
              </p>
              <Link href="/goals" className="text-magenta text-xs font-medium">
                View all
              </Link>
            </div>
            <ProgressBar value={primaryGoal.saved} max={primaryGoal.target} />
            <p className="text-xs text-mute mt-2">
              {formatNaira(primaryGoal.saved)} of {formatNaira(primaryGoal.target)}
            </p>
          </Card>
        )}

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <SectionEyebrow>Ask {user.ammyName}</SectionEyebrow>
              <p className="text-ink text-sm leading-relaxed max-w-[220px]">
                "How much would ₦2,000 a month become in 5 years?"
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-magenta/10 flex items-center justify-center shrink-0">
              <Sparkles size={18} className="text-magenta" />
            </div>
          </div>
          <Link href="/ammy" className="block mt-4">
            <Button variant="secondary" className="w-full justify-between">
              Chat with {user.ammyName} <ArrowRight size={16} />
            </Button>
          </Link>
        </Card>

        {nextLesson && (
          <Card className="p-5">
            <SectionEyebrow>Continue learning</SectionEyebrow>
            <p className="font-display font-semibold text-ink">
              {nextLesson.title}
            </p>
            <p className="text-sm text-mute mt-1">
              {nextLesson.minutes} min · +{nextLesson.xp} XP
            </p>
            <Link href="/learn" className="block mt-4">
              <Button className="w-full">Start lesson</Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
