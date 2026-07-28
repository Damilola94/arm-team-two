import React from "react";

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white rounded-xl2 shadow-card border border-sand/60 ${className}`}
    >
      {children}
    </div>
  );
}

export function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "gold";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const base =
    "focus-ring inline-flex items-center justify-center gap-2 rounded-full font-display font-medium text-sm px-5 py-3 transition-transform active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none";
  const variants: Record<string, string> = {
    primary: "bg-ink text-cream hover:bg-plum",
    secondary: "bg-sand text-ink hover:bg-sand/70",
    ghost: "bg-transparent text-ink hover:bg-sand/50",
    gold: "bg-ember text-ink hover:brightness-95",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function ProgressBar({
  value,
  max,
  colorClass = "bg-magenta",
}: {
  value: number;
  max: number;
  colorClass?: string;
}) {
  const pct = Math.min(100, Math.round((value / Math.max(max, 1)) * 100));
  return (
    <div className="w-full h-2.5 rounded-full bg-sand overflow-hidden">
      <div
        className={`h-full rounded-full ${colorClass} transition-all duration-500`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function Pill({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display uppercase tracking-[0.14em] text-xs text-mute mb-2">
      {children}
    </p>
  );
}
