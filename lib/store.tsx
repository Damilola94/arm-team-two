"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { UserState, ExperienceLevel, ChatMessage } from "./types";
import { defaultUserState } from "./mockData";
import { generateAmmyReply } from "./ammy";

const STORAGE_KEY = "arm-savvy-state-v1";

type StoreShape = {
  user: UserState;
  ready: boolean;
  completeOnboarding: (level: ExperienceLevel, ammyName: string, name: string) => void;
  logDailyAction: (xp: number) => void;
  completeLesson: (lessonId: string) => void;
  addGoalContribution: (goalId: string, amount: number) => void;
  createGoal: (name: string, target: number, monthly: number, emoji: string) => void;
  sendChatMessage: (content: string) => void;
  resetAll: () => void;
};

const StoreContext = createContext<StoreShape | null>(null);

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const d1 = new Date(a).getTime();
  const d2 = new Date(b).getTime();
  return Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserState>(defaultUserState());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setUser(JSON.parse(raw));
      }
    } catch (e) {
      // ignore corrupted storage
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      // storage unavailable, fail silently
    }
  }, [user, ready]);

  const bumpStreak = useCallback((prev: UserState): UserState => {
    const today = todayStr();
    if (prev.lastCheckIn === today) return prev; // already logged today
    let newStreak = 1;
    if (prev.lastCheckIn && daysBetween(prev.lastCheckIn, today) === 1) {
      newStreak = prev.streak + 1;
    }
    const newLog = [...prev.weekLog.slice(1), true];
    return {
      ...prev,
      streak: newStreak,
      longestStreak: Math.max(newStreak, prev.longestStreak),
      lastCheckIn: today,
      weekLog: newLog,
    };
  }, []);

  const completeOnboarding = useCallback(
    (level: ExperienceLevel, ammyName: string, name: string) => {
      setUser((prev) => ({
        ...prev,
        level,
        ammyName: ammyName || prev.ammyName,
        name: name || prev.name,
        onboarded: true,
      }));
    },
    []
  );

  const logDailyAction = useCallback(
    (xp: number) => {
      setUser((prev) => {
        const bumped = bumpStreak(prev);
        return { ...bumped, points: bumped.points + xp };
      });
    },
    [bumpStreak]
  );

  const completeLesson = useCallback(
    (lessonId: string) => {
      setUser((prev) => {
        const lesson = prev.lessons.find((l) => l.id === lessonId);
        if (!lesson || lesson.done) return prev;
        const bumped = bumpStreak(prev);
        return {
          ...bumped,
          points: bumped.points + lesson.xp,
          lessons: bumped.lessons.map((l) =>
            l.id === lessonId ? { ...l, done: true } : l
          ),
        };
      });
    },
    [bumpStreak]
  );

  const addGoalContribution = useCallback(
    (goalId: string, amount: number) => {
      setUser((prev) => {
        const bumped = bumpStreak(prev);
        return {
          ...bumped,
          points: bumped.points + 15,
          balance: bumped.balance + amount,
          totalInvested: bumped.totalInvested + amount,
          goals: bumped.goals.map((g) =>
            g.id === goalId ? { ...g, saved: g.saved + amount } : g
          ),
        };
      });
    },
    [bumpStreak]
  );

  const createGoal = useCallback(
    (name: string, target: number, monthly: number, emoji: string) => {
      setUser((prev) => ({
        ...prev,
        goals: [
          ...prev.goals,
          {
            id: `g${Date.now()}`,
            name,
            target,
            saved: 0,
            monthly,
            emoji,
          },
        ],
      }));
    },
    []
  );

  const sendChatMessage = useCallback((content: string) => {
    setUser((prev) => {
      const userMsg: ChatMessage = {
        id: `m${Date.now()}`,
        role: "user",
        content,
        ts: Date.now(),
      };
      const reply = generateAmmyReply(content, prev);
      const ammyMsg: ChatMessage = {
        id: `m${Date.now() + 1}`,
        role: "ammy",
        content: reply,
        ts: Date.now() + 1,
      };
      return { ...prev, chat: [...prev.chat, userMsg, ammyMsg] };
    });
  }, []);

  const resetAll = useCallback(() => {
    setUser(defaultUserState());
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }, []);

  return (
    <StoreContext.Provider
      value={{
        user,
        ready,
        completeOnboarding,
        logDailyAction,
        completeLesson,
        addGoalContribution,
        createGoal,
        sendChatMessage,
        resetAll,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): StoreShape {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
