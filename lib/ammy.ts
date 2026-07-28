import { UserState } from "./types";
import { formatNaira, projectCompoundGrowth } from "./compound";

function extractNumber(text: string): number | null {
  const match = text.replace(/,/g, "").match(/(\d+(\.\d+)?)\s*(k|m)?/i);
  if (!match) return null;
  let value = parseFloat(match[1]);
  if (match[3]?.toLowerCase() === "k") value *= 1000;
  if (match[3]?.toLowerCase() === "m") value *= 1000000;
  return value;
}

function extractYears(text: string): number {
  const match = text.match(/(\d+)\s*year/i);
  if (match) return parseInt(match[1], 10);
  return 3;
}

export function generateAmmyReply(input: string, user: UserState): string {
  const text = input.toLowerCase();
  const name = user.ammyName;

  if (text.includes("how much would") || (text.includes("become") && /\d/.test(text))) {
    const monthly = extractNumber(text) ?? 2000;
    const years = extractYears(text);
    const points = projectCompoundGrowth({
      principal: 0,
      monthly,
      annualRate: 0.15,
      years,
    });
    const final = points[points.length - 1];
    return `Putting away ${formatNaira(monthly)} every month for ${years} year${years > 1 ? "s" : ""} at a typical 15% annual return would grow to roughly ${formatNaira(final.balance)}. You'd have contributed ${formatNaira(final.contributed)} of that yourself — the rest is compounding doing its job. Want me to add this as a goal?`;
  }

  if (text.includes("risk")) {
    return "Risk just measures how much a fund's value can move before it settles where you expect. Money market funds barely move — great for money you need soon. Equity-leaning funds move more year to year but tend to reward patience over 5+ years. What's this money for, and when do you need it?";
  }

  if (text.includes("money market") || text.includes("fixed income")) {
    return "Money market funds are the calm option — short-term, low-risk, daily interest, best for money you might need within a year. Fixed income funds hold longer bonds — a bit more return, a bit more patience needed. If you're not sure which fits, tell me your goal and timeline and I'll suggest one.";
  }

  if (text.includes("start") && (text.includes("500") || text.includes("small"))) {
    return "You can start with ₦500 — same fund, same fund manager, same returns per naira as a ₦5,000,000 investor. The only difference more money buys is speed, not access. Want to set up a goal starting from what you have right now?";
  }

  if (text.includes("goal") || text.includes("target")) {
    if (user.goals.length > 0) {
      const g = user.goals[0];
      const remaining = Math.max(g.target - g.saved, 0);
      return `Your "${g.name}" goal is ${formatNaira(g.saved)} of ${formatNaira(g.target)} — ${formatNaira(remaining)} to go. At ${formatNaira(g.monthly)}/month, you're on track. Want me to recalculate with a different monthly amount?`;
    }
    return "You don't have a goal set yet — head to the Goals tab and I'll help you size one to your income and timeline.";
  }

  if (text.includes("inflation") || text.includes("naira")) {
    return "If inflation is running around 20% and cash sits idle, you quietly lose about a fifth of its buying power a year without spending anything. Investing in a fund that returns above inflation means you're gaining ground instead of losing it under the mattress.";
  }

  if (text.includes("streak") || text.includes("point")) {
    return `You're on a ${user.streak}-day streak with ${user.points} points banked. Keep logging in and contributing — streak points can be gifted to a friend or saved toward real rewards.`;
  }

  if (text.includes("hi") || text.includes("hello") || text.includes("hey")) {
    return `Hey ${user.name.split(" ")[0]}! I'm ${name}. Ask me about your goals, a fund, or try "How much would ₦3,000 a month become in 5 years?"`;
  }

  return `Good question. Here's a simple way to think about it: match the fund's risk to how soon you need the money, and let consistency — not lump sums — do most of the work. Want me to run the numbers on a specific amount or timeline?`;
}
