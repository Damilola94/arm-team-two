# ARM SAVVY — Prototype

A clickable, end-to-end Next.js prototype of the **ARM SAVVY** proposition: ARM One reimagined as a learning-first, AI-guided, socially engaging investment experience for first-time and early-career investors.

This is a **frontend prototype** — all data (balances, streaks, chat) is mocked and stored in your browser's `localStorage`. There is no real backend, bank connection, or fund transaction happening. It's built to be clicked through, demoed, and used as a conversation piece with stakeholders or as a starting point for real engineering.

## What's implemented

| Proposal pillar | Where it lives |
|---|---|
| **1. What it is / onboarding** | `/onboarding` — a 3-step diagnostic (name, experience level, name your assistant) that personalizes the rest of the app |
| **2. Ammy, the AI Investment Assistant** | `/ammy` — a chat interface with a rule-based reply engine (`lib/ammy.ts`) that answers questions about goals, risk, compounding, and fund types in plain language. Swap this for a real LLM call later — the response function is isolated in one file |
| **3. Gamified learning ("Duolingo of investing")** | `/learn` — a lesson feed with streaks, XP, and a 7-day streak ring; `/dashboard` surfaces the next lesson |
| **4. Community & social investing** | `/community` — a leaderboard (you vs. mock peers) and joinable "investment leagues" |
| **5. Goal-setting + compounding calculator** | `/goals` — goal progress bars, contribution actions, and an interactive compounding calculator with a bar-chart projection |
| **6. Wallet / fund allocation** | `/wallet` — balance, fund allocation breakdown, and mock transaction history |
| **Monetization framing** | Ammy's chat and lesson content nod to the free-tier / paid-advisory split described in the proposal; wire up a pricing gate here when ready |

## Design language

- **Palette**: deep navy ink (`#14122B`), ARM magenta (`#A3195B`), streak gold (`#E8A33D`), growth sage (`#3F7D5C`), warm cream background (`#F7F4EE`)
- **Type**: Space Grotesk (display) + Inter (body)
- **Signature element**: the dashed streak ring on the dashboard — a hand-drawn-feel progress indicator that ties the habit loop to the visual identity
- Mobile-first, bottom tab navigation, built to be demoed on a phone

## Running it locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

To build for production:

```bash
npm run build
npm start
```

## Project structure

```
app/
  page.tsx            → landing/hero
  onboarding/          → diagnostic flow
  dashboard/           → home screen
  ammy/                → AI chat
  learn/               → gamified lesson feed
  community/           → leaderboard + leagues
  goals/               → goal tracking + compounding calculator
  wallet/              → balance + allocation + transactions
components/            → shared UI (Card, Button, StreakRing, nav, etc.)
lib/
  store.tsx            → global app state (React Context + localStorage)
  ammy.ts              → Ammy's rule-based reply engine — swap for a real LLM here
  compound.ts          → compounding-interest math
  mockData.ts          → lessons, leaderboard, leagues, default user state
  types.ts             → shared TypeScript types
```

## Next steps to make this real

1. Replace `lib/ammy.ts` with a real API call (Anthropic API or your model of choice) to a `/api/ammy` route, keeping the same function signature.
2. Replace `lib/store.tsx`'s localStorage persistence with real auth + a database-backed API.
3. Connect `/wallet` and `/goals` contribution actions to ARM's actual fund infrastructure and payment rails.
4. Add the entry diagnostic's answers to real content branching (right now it's stored but not yet used to filter lesson difficulty — a good first extension).
# arm-team-two
