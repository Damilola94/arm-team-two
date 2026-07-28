"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { TopBar } from "@/components/TopBar";
import { Card, Button, Pill, SectionEyebrow } from "@/components/ui";
import { LEADERBOARD, LEAGUES } from "@/lib/mockData";
import { Flame, Users, Gift } from "lucide-react";
import { RequireOnboarded } from "@/components/RequireOnboarded";

export default function CommunityPage() {
  return (
    <RequireOnboarded>
      <CommunityContent />
    </RequireOnboarded>
  );
}

function CommunityContent() {
  const { user, ready } = useStore();
  const [tab, setTab] = useState<"leaderboard" | "leagues">("leaderboard");
  const [joined, setJoined] = useState<string[]>([]);

  if (!ready) return null;

  const board = LEADERBOARD.map((e) =>
    e.isYou ? { ...e, points: user.points, streak: user.streak } : e
  ).sort((a, b) => b.points - a.points);

  return (
    <div>
      <TopBar title="Community" />
      <div className="px-5 pt-5">
        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setTab("leaderboard")}
            className={`focus-ring flex-1 rounded-full py-2.5 text-sm font-display font-medium transition-colors ${
              tab === "leaderboard" ? "bg-ink text-cream" : "bg-sand text-mute"
            }`}
          >
            Leaderboard
          </button>
          <button
            onClick={() => setTab("leagues")}
            className={`focus-ring flex-1 rounded-full py-2.5 text-sm font-display font-medium transition-colors ${
              tab === "leagues" ? "bg-ink text-cream" : "bg-sand text-mute"
            }`}
          >
            Leagues
          </button>
        </div>

        {tab === "leaderboard" && (
          <div className="space-y-3">
            <Card className="p-4 flex items-center gap-3 bg-magenta text-white">
              <Gift size={18} />
              <p className="text-sm">
                Gift streak points to a friend and invite them to invest alongside you.
              </p>
            </Card>
            {board.map((entry, i) => (
              <Card
                key={entry.id}
                className={`p-4 flex items-center justify-between ${
                  entry.isYou ? "border-2 border-magenta" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-display font-semibold text-mute w-5 text-sm">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display font-semibold text-ink text-sm">
                      {entry.isYou ? "You" : entry.name}
                    </p>
                    <p className="text-xs text-mute flex items-center gap-1 mt-0.5">
                      <Flame size={11} className="text-ember" /> {entry.streak}-day streak
                    </p>
                  </div>
                </div>
                <p className="font-display font-semibold text-magenta text-sm">
                  {entry.points.toLocaleString()} pts
                </p>
              </Card>
            ))}
          </div>
        )}

        {tab === "leagues" && (
          <div className="space-y-3">
            <SectionEyebrow>Join a league</SectionEyebrow>
            {LEAGUES.map((league) => {
              const isJoined = joined.includes(league.id);
              return (
                <Card key={league.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display font-semibold text-ink text-sm">
                        {league.name}
                      </p>
                      <p className="text-xs text-mute mt-1 leading-relaxed">
                        {league.description}
                      </p>
                      <Pill className="bg-sand text-mute mt-2">
                        <Users size={11} /> {league.members} members
                      </Pill>
                    </div>
                    <Button
                      variant={isJoined ? "secondary" : "primary"}
                      className="px-4 py-2 text-xs shrink-0"
                      onClick={() =>
                        setJoined((prev) =>
                          isJoined
                            ? prev.filter((id) => id !== league.id)
                            : [...prev, league.id]
                        )
                      }
                    >
                      {isJoined ? "Joined" : "Join"}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
