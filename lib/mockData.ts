import { Lesson, LeaderboardEntry, UserState } from "./types";

export const LESSON_LIBRARY: Lesson[] = [
  {
    id: "l1",
    title: "Why ₦500 can start a portfolio",
    category: "Basics",
    minutes: 2,
    xp: 20,
    body:
      "Most people think investing needs millions. It doesn't. ARM SAVVY funds let you start from ₦500 — the same fund, the same fund manager, the same returns as someone investing ₦5,000,000. What changes with more money isn't access, it's speed. Start small, stay consistent, and let time do the heavy lifting.",
    done: false,
  },
  {
    id: "l2",
    title: "Money market vs. fixed income, in plain English",
    category: "Basics",
    minutes: 3,
    xp: 25,
    body:
      "A money market fund holds short-term, low-risk instruments — think of it as a savings account that actually works hard for you, with daily interest. A fixed income fund holds longer bonds, usually with a bit more return and a bit more patience required. Neither is 'better' — they answer different questions: how soon do you need the money, and how much wobble can you stomach?",
    done: false,
  },
  {
    id: "l3",
    title: "Compounding: the only 'get rich slow' scheme that works",
    category: "Growth",
    minutes: 3,
    xp: 25,
    body:
      "Compounding means your returns start earning their own returns. ₦10,000 growing at 15% a year becomes ₦11,500 after year one — but by year ten, you're earning on ₦40,000+, not ₦10,000. The trick isn't a bigger number, it's not touching it. Try the calculator on your Goals tab and watch what 5 extra years does.",
    done: false,
  },
  {
    id: "l4",
    title: "Risk isn't a bad word",
    category: "Growth",
    minutes: 3,
    xp: 25,
    body:
      "Risk just means 'how much can this number move before it lands where you want it.' Cash loses to inflation quietly. Higher-risk funds move more year to year but tend to win over 5+ years. The goal isn't to avoid risk — it's to match the right amount of it to how long you can leave the money alone.",
    done: false,
  },
  {
    id: "l5",
    title: "Naira devaluation and why saving in cash is a leak",
    category: "Mindset",
    minutes: 3,
    xp: 30,
    body:
      "If inflation runs at 20% and your cash sits idle, you lose 20% of its buying power in a year without spending a kobo. Investing doesn't eliminate this — but a fund returning above inflation means you're actually gaining ground instead of quietly losing it under your mattress.",
    done: false,
  },
  {
    id: "l6",
    title: "Diversification: don't marry one fund",
    category: "Strategy",
    minutes: 4,
    xp: 30,
    body:
      "Spreading money across a money market fund, a fixed income fund, and an equity fund means no single bad month sinks your whole plan. Think of it as a football team — you don't play with 11 strikers. Balance the squad.",
    done: false,
  },
  {
    id: "l7",
    title: "Reading a fund factsheet without panicking",
    category: "Strategy",
    minutes: 4,
    xp: 30,
    body:
      "Three numbers matter most: the historical yield (what it's returned), the minimum investment, and the exit/redemption terms (how fast you get your money back). Everything else on the factsheet is context — those three tell you if the fund fits your goal.",
    done: false,
  },
];

export const LEADERBOARD: LeaderboardEntry[] = [
  { id: "u1", name: "Tobi A.", points: 2840, streak: 41 },
  { id: "u2", name: "Chiamaka O.", points: 2510, streak: 33 },
  { id: "you", name: "You", points: 0, streak: 0, isYou: true },
  { id: "u3", name: "Ifeoma K.", points: 1870, streak: 22 },
  { id: "u4", name: "David E.", points: 1490, streak: 15 },
  { id: "u5", name: "Mariam Y.", points: 1120, streak: 12 },
  { id: "u6", name: "Segun B.", points: 860, streak: 9 },
];

export const LEAGUES = [
  {
    id: "league1",
    name: "First ₦10k League",
    members: 214,
    description: "For investors on their way to their first ₦10,000 saved.",
  },
  {
    id: "league2",
    name: "Consistency Club",
    members: 96,
    description: "30-day streak minimum. No skipped weeks.",
  },
  {
    id: "league3",
    name: "Campus Investors — UNILAG",
    members: 58,
    description: "A league built by students, for students.",
  },
];

export function defaultUserState(): UserState {
  return {
    name: "Damilola",
    ammyName: "Ammy",
    level: null,
    onboarded: false,
    balance: 12500,
    totalInvested: 12500,
    streak: 0,
    longestStreak: 0,
    points: 0,
    lastCheckIn: null,
    weekLog: [false, false, false, false, false, false, false],
    goals: [
      {
        id: "g1",
        name: "Emergency cushion",
        target: 50000,
        saved: 12500,
        monthly: 5000,
        emoji: "🛟",
      },
    ],
    lessons: LESSON_LIBRARY,
    chat: [
      {
        id: "m0",
        role: "ammy",
        content:
          "Hi! I'm Ammy, your investment assistant. Ask me anything about your money — no question is too small. Try: \"How much would ₦2,000 a month become in 3 years?\"",
        ts: Date.now(),
      },
    ],
  };
}
