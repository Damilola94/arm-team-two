"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Button, Card, ProgressBar } from "@/components/ui";
import { ExperienceLevel } from "@/lib/types";

const STEPS = 3;

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding } = useStore();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [level, setLevel] = useState<ExperienceLevel | null>(null);
  const [ammyName, setAmmyName] = useState("Ammy");

  function finish() {
    completeOnboarding(level ?? "new", ammyName.trim() || "Ammy", name.trim() || "Investor");
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col px-6 py-8">
      <div className="mb-8">
        <ProgressBar value={step + 1} max={STEPS} colorClass="bg-magenta" />
        <p className="text-xs text-mute mt-2">
          Step {step + 1} of {STEPS}
        </p>
      </div>

      {step === 0 && (
        <div className="flex-1 flex flex-col">
          <h2 className="font-display text-2xl font-semibold text-ink mb-2">
            What should we call you?
          </h2>
          <p className="text-mute text-sm mb-6">
            Just your first name is fine.
          </p>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Damilola"
            className="focus-ring w-full rounded-xl2 border border-sand bg-white px-4 py-3.5 text-ink placeholder:text-mute/60"
          />
          <div className="mt-auto pt-8">
            <Button
              className="w-full"
              disabled={!name.trim()}
              onClick={() => setStep(1)}
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="flex-1 flex flex-col">
          <h2 className="font-display text-2xl font-semibold text-ink mb-2">
            Where are you starting from?
          </h2>
          <p className="text-mute text-sm mb-6">
            This shapes your learning path and how {ammyName} talks to you —
            a beginner and someone with experience shouldn't see the same app.
          </p>
          <div className="space-y-3">
            <Card
              className={`p-5 cursor-pointer border-2 ${
                level === "new" ? "border-magenta" : "border-transparent"
              }`}
              // eslint-disable-next-line
            >
              <button
                className="text-left w-full"
                onClick={() => setLevel("new")}
              >
                <p className="font-display font-semibold text-ink">
                  I've never invested before
                </p>
                <p className="text-sm text-mute mt-1">
                  Start from the absolute basics — no jargon.
                </p>
              </button>
            </Card>
            <Card
              className={`p-5 cursor-pointer border-2 ${
                level === "some" ? "border-magenta" : "border-transparent"
              }`}
            >
              <button
                className="text-left w-full"
                onClick={() => setLevel("some")}
              >
                <p className="font-display font-semibold text-ink">
                  I've dabbled a little
                </p>
                <p className="text-sm text-mute mt-1">
                  I've saved or invested before but want to go further.
                </p>
              </button>
            </Card>
          </div>
          <div className="mt-auto pt-8 flex gap-3">
            <Button variant="secondary" onClick={() => setStep(0)}>
              Back
            </Button>
            <Button
              className="flex-1"
              disabled={!level}
              onClick={() => setStep(2)}
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex-1 flex flex-col">
          <h2 className="font-display text-2xl font-semibold text-ink mb-2">
            Name your investment assistant
          </h2>
          <p className="text-mute text-sm mb-6">
            You can rename her any time — a more personal relationship with
            your money starts here.
          </p>
          <input
            autoFocus
            value={ammyName}
            onChange={(e) => setAmmyName(e.target.value)}
            placeholder="Ammy"
            className="focus-ring w-full rounded-xl2 border border-sand bg-white px-4 py-3.5 text-ink placeholder:text-mute/60"
          />
          <div className="mt-auto pt-8 flex gap-3">
            <Button variant="secondary" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button className="flex-1" onClick={finish}>
              Start investing
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
