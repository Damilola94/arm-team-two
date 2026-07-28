"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { TopBar } from "@/components/TopBar";
import { Card, Button, Pill } from "@/components/ui";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { RequireOnboarded } from "@/components/RequireOnboarded";

export default function LearnPage() {
  return (
    <RequireOnboarded>
      <LearnContent />
    </RequireOnboarded>
  );
}

function LearnContent() {
  const { user, ready, completeLesson } = useStore();
  const [openId, setOpenId] = useState<string | null>(null);

  if (!ready) return null;

  const doneCount = user.lessons.filter((l) => l.done).length;

  return (
    <div>
      <TopBar title="Learn" />
      <div className="px-5 pt-5">
        <Card className="p-4 mb-5 flex items-center justify-between">
          <div>
            <p className="font-display font-semibold text-ink text-sm">
              {doneCount} of {user.lessons.length} lessons done
            </p>
            <p className="text-xs text-mute mt-0.5">
              A short lesson a day keeps your streak alive.
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center font-display font-semibold text-ink text-sm">
            {Math.round((doneCount / user.lessons.length) * 100)}%
          </div>
        </Card>

        <div className="space-y-3">
          {user.lessons.map((lesson) => {
            const open = openId === lesson.id;
            return (
              <Card key={lesson.id} className="overflow-hidden">
                <button
                  className="focus-ring w-full text-left px-5 py-4 flex items-center justify-between gap-3"
                  onClick={() => setOpenId(open ? null : lesson.id)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        lesson.done ? "bg-sage text-white" : "bg-sand text-mute"
                      }`}
                    >
                      {lesson.done ? <Check size={15} /> : null}
                    </div>
                    <div className="min-w-0">
                      <p className="font-display font-semibold text-ink text-sm truncate">
                        {lesson.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Pill className="bg-sand text-mute">{lesson.category}</Pill>
                        <span className="text-xs text-mute">
                          {lesson.minutes} min · +{lesson.xp} XP
                        </span>
                      </div>
                    </div>
                  </div>
                  {open ? (
                    <ChevronUp size={18} className="text-mute shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-mute shrink-0" />
                  )}
                </button>
                {open && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-ink/80 leading-relaxed">
                      {lesson.body}
                    </p>
                    <Button
                      className="w-full mt-4"
                      variant={lesson.done ? "secondary" : "gold"}
                      disabled={lesson.done}
                      onClick={() => completeLesson(lesson.id)}
                    >
                      {lesson.done ? "Completed" : `Mark done · +${lesson.xp} XP`}
                    </Button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
