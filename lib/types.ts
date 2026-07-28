export type ExperienceLevel = "new" | "some";

export type ChatMessage = {
  id: string;
  role: "user" | "ammy";
  content: string;
  ts: number;
};

export type Goal = {
  id: string;
  name: string;
  target: number;
  saved: number;
  monthly: number;
  emoji: string;
};

export type Lesson = {
  id: string;
  title: string;
  category: string;
  minutes: number;
  xp: number;
  body: string;
  done: boolean;
};

export type LeaderboardEntry = {
  id: string;
  name: string;
  points: number;
  streak: number;
  isYou?: boolean;
};

export type UserState = {
  name: string;
  ammyName: string;
  level: ExperienceLevel | null;
  onboarded: boolean;
  balance: number;
  totalInvested: number;
  streak: number;
  longestStreak: number;
  points: number;
  lastCheckIn: string | null; // yyyy-mm-dd
  weekLog: boolean[]; // last 7 days, true = active
  goals: Goal[];
  lessons: Lesson[];
  chat: ChatMessage[];
};
