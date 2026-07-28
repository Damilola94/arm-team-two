"use client";

import { useMemo, useState } from "react";
import { useStore } from "@/lib/store";
import { TopBar } from "@/components/TopBar";
import { Card, Button, ProgressBar, SectionEyebrow } from "@/components/ui";
import { formatNaira, projectCompoundGrowth } from "@/lib/compound";
import { RequireOnboarded } from "@/components/RequireOnboarded";

export default function GoalsPage() {
  return (
    <RequireOnboarded>
      <GoalsContent />
    </RequireOnboarded>
  );
}

function GoalsContent() {
  const { user, ready, addGoalContribution, createGoal } = useStore();
  const [calcMonthly, setCalcMonthly] = useState(3000);
  const [calcYears, setCalcYears] = useState(5);
  const [calcRate, setCalcRate] = useState(15);
  const [newGoalOpen, setNewGoalOpen] = useState(false);
  const [goalName, setGoalName] = useState("");
  const [goalTarget, setGoalTarget] = useState(100000);
  const [goalMonthly, setGoalMonthly] = useState(5000);

  const projection = useMemo(
    () =>
      projectCompoundGrowth({
        principal: 0,
        monthly: calcMonthly,
        annualRate: calcRate / 100,
        years: calcYears,
      }),
    [calcMonthly, calcYears, calcRate]
  );
  const final = projection[projection.length - 1];
  const maxBalance = Math.max(...projection.map((p) => p.balance), 1);

  if (!ready) return null;

  return (
    <div>
      <TopBar title="Goals" />
      <div className="px-5 pt-5 space-y-5">
        {user.goals.map((goal) => (
          <Card key={goal.id} className="p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="font-display font-semibold text-ink">
                {goal.emoji} {goal.name}
              </p>
              <span className="text-xs text-mute">
                {formatNaira(goal.monthly)}/mo
              </span>
            </div>
            <ProgressBar value={goal.saved} max={goal.target} />
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-mute">
                {formatNaira(goal.saved)} of {formatNaira(goal.target)}
              </p>
              <p className="text-xs font-medium text-magenta">
                {Math.min(100, Math.round((goal.saved / goal.target) * 100))}%
              </p>
            </div>
            <Button
              variant="secondary"
              className="w-full mt-4"
              onClick={() => addGoalContribution(goal.id, goal.monthly)}
            >
              Contribute {formatNaira(goal.monthly)} now
            </Button>
          </Card>
        ))}

        {!newGoalOpen ? (
          <Button
            variant="ghost"
            className="w-full border border-dashed border-mute/40"
            onClick={() => setNewGoalOpen(true)}
          >
            + Add a new goal
          </Button>
        ) : (
          <Card className="p-5 space-y-3">
            <SectionEyebrow>New goal</SectionEyebrow>
            <input
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              placeholder="Goal name, e.g. New laptop"
              className="focus-ring w-full rounded-xl2 border border-sand px-4 py-3 text-sm"
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-mute">Target (₦)</label>
                <input
                  type="number"
                  value={goalTarget}
                  onChange={(e) => setGoalTarget(Number(e.target.value))}
                  className="focus-ring w-full rounded-xl2 border border-sand px-4 py-2.5 text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-mute">Monthly (₦)</label>
                <input
                  type="number"
                  value={goalMonthly}
                  onChange={(e) => setGoalMonthly(Number(e.target.value))}
                  className="focus-ring w-full rounded-xl2 border border-sand px-4 py-2.5 text-sm mt-1"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              <Button variant="secondary" onClick={() => setNewGoalOpen(false)}>
                Cancel
              </Button>
              <Button
                className="flex-1"
                disabled={!goalName.trim() || goalTarget <= 0}
                onClick={() => {
                  createGoal(goalName.trim(), goalTarget, goalMonthly, "🎯");
                  setGoalName("");
                  setNewGoalOpen(false);
                }}
              >
                Create goal
              </Button>
            </div>
          </Card>
        )}

        <Card className="p-5">
          <SectionEyebrow>Compounding calculator</SectionEyebrow>
          <p className="text-sm text-mute mb-4">
            See what consistency actually buys you.
          </p>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-mute mb-1">
                <span>Monthly contribution</span>
                <span className="font-medium text-ink">
                  {formatNaira(calcMonthly)}
                </span>
              </div>
              <input
                type="range"
                min={500}
                max={50000}
                step={500}
                value={calcMonthly}
                onChange={(e) => setCalcMonthly(Number(e.target.value))}
                className="w-full accent-magenta"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-mute mb-1">
                <span>Years</span>
                <span className="font-medium text-ink">{calcYears} yrs</span>
              </div>
              <input
                type="range"
                min={1}
                max={20}
                step={1}
                value={calcYears}
                onChange={(e) => setCalcYears(Number(e.target.value))}
                className="w-full accent-magenta"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-mute mb-1">
                <span>Expected annual return</span>
                <span className="font-medium text-ink">{calcRate}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={25}
                step={1}
                value={calcRate}
                onChange={(e) => setCalcRate(Number(e.target.value))}
                className="w-full accent-magenta"
              />
            </div>
          </div>

          <div className="mt-5 rounded-xl2 bg-ink text-cream p-4">
            <p className="text-xs text-cream/60">
              Projected value after {calcYears} years
            </p>
            <p className="font-display text-2xl font-semibold text-ember mt-1">
              {formatNaira(final.balance)}
            </p>
            <p className="text-xs text-cream/60 mt-1">
              {formatNaira(final.contributed)} contributed ·{" "}
              {formatNaira(final.balance - final.contributed)} earned
            </p>
          </div>

          <div className="mt-4 flex items-end gap-1 h-24">
            {projection.map((p) => (
              <div
                key={p.year}
                className="flex-1 bg-magenta/70 rounded-t-sm"
                style={{
                  height: `${Math.max((p.balance / maxBalance) * 100, 3)}%`,
                }}
                title={`Year ${p.year}: ${formatNaira(p.balance)}`}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
