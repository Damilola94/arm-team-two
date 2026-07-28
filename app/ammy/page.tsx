"use client";

import { useState, useRef, useEffect } from "react";
import { useStore } from "@/lib/store";
import { TopBar } from "@/components/TopBar";
import { Sparkles, Send } from "lucide-react";
import { RequireOnboarded } from "@/components/RequireOnboarded";

const SUGGESTIONS = [
  "How much would ₦2,000/month become in 5 years?",
  "What's the difference between money market and fixed income?",
  "How does my goal look right now?",
  "Why does risk matter for me?",
];

export default function AmmyPage() {
  return (
    <RequireOnboarded>
      <AmmyContent />
    </RequireOnboarded>
  );
}

function AmmyContent() {
  const { user, ready, sendChatMessage } = useStore();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [user.chat.length]);

  if (!ready) return null;

  function handleSend(text?: string) {
    const value = (text ?? input).trim();
    if (!value) return;
    sendChatMessage(value);
    setInput("");
  }

  return (
    <div className="flex flex-col h-screen">
      <TopBar title={user.ammyName} />
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar px-5 py-5 space-y-4"
      >
        {user.chat.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {m.role === "ammy" && (
              <div className="w-7 h-7 rounded-full bg-magenta/10 flex items-center justify-center shrink-0 mr-2 mt-1">
                <Sparkles size={13} className="text-magenta" />
              </div>
            )}
            <div
              className={`max-w-[78%] rounded-xl2 px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-ink text-cream rounded-br-md"
                  : "bg-white border border-sand text-ink rounded-bl-md"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {user.chat.length <= 1 && (
          <div className="pt-2 space-y-2">
            <p className="text-xs text-mute font-medium">Try asking:</p>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                className="focus-ring block w-full text-left rounded-xl2 border border-sand bg-white px-4 py-3 text-sm text-ink hover:border-magenta/40"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="border-t border-sand bg-cream px-5 py-3 sticky bottom-16 mb-0"
      >
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask ${user.ammyName} anything...`}
            className="focus-ring flex-1 rounded-full border border-sand bg-white px-4 py-3 text-sm text-ink placeholder:text-mute/60"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="focus-ring w-11 h-11 rounded-full bg-ink text-cream flex items-center justify-center shrink-0 active:scale-95 transition-transform"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
