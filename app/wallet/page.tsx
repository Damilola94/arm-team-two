"use client";

import { useStore } from "@/lib/store";
import { TopBar } from "@/components/TopBar";
import { Card, ProgressBar, SectionEyebrow } from "@/components/ui";
import { formatNaira } from "@/lib/compound";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { RequireOnboarded } from "@/components/RequireOnboarded";

const ALLOCATION = [
  { name: "Money Market Fund", pct: 55, color: "bg-magenta" },
  { name: "Fixed Income Fund", pct: 30, color: "bg-ember" },
  { name: "Equity Fund", pct: 15, color: "bg-sage" },
];

export default function WalletPage() {
  return (
    <RequireOnboarded>
      <WalletContent />
    </RequireOnboarded>
  );
}

function WalletContent() {
  const { user, ready } = useStore();
  if (!ready) return null;

  const transactions = [
    { id: "t1", label: "Emergency cushion contribution", amount: 5000, type: "in" },
    { id: "t2", label: "Money Market Fund yield", amount: 312, type: "in" },
    { id: "t3", label: "Emergency cushion contribution", amount: 5000, type: "in" },
    { id: "t4", label: "Withdrawal to bank", amount: 2000, type: "out" },
  ];

  return (
    <div>
      <TopBar title="Wallet" />
      <div className="px-5 pt-5 space-y-5">
        <Card className="p-5 bg-ink text-cream">
          <SectionEyebrow>
            <span className="text-ember">Total balance</span>
          </SectionEyebrow>
          <p className="font-display text-3xl font-semibold">
            {formatNaira(user.balance)}
          </p>
        </Card>

        <Card className="p-5">
          <SectionEyebrow>Allocation</SectionEyebrow>
          <div className="space-y-3 mt-2">
            {ALLOCATION.map((a) => (
              <div key={a.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-ink font-medium">{a.name}</span>
                  <span className="text-mute">{a.pct}%</span>
                </div>
                <ProgressBar value={a.pct} max={100} colorClass={a.color} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <SectionEyebrow>Recent activity</SectionEyebrow>
          <div className="divide-y divide-sand mt-2">
            {transactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      t.type === "in" ? "bg-sage/15 text-sage" : "bg-magenta/15 text-magenta"
                    }`}
                  >
                    {t.type === "in" ? (
                      <ArrowDownRight size={15} />
                    ) : (
                      <ArrowUpRight size={15} />
                    )}
                  </div>
                  <p className="text-sm text-ink">{t.label}</p>
                </div>
                <p
                  className={`text-sm font-medium ${
                    t.type === "in" ? "text-sage" : "text-magenta"
                  }`}
                >
                  {t.type === "in" ? "+" : "-"}
                  {formatNaira(t.amount)}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
