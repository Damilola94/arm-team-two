import React from "react";

export function StreakRing({
  streak,
  weekLog,
}: {
  streak: number;
  weekLog: boolean[];
}) {
  const size = 96;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const activeDays = weekLog.filter(Boolean).length;
  const progress = (activeDays / 7) * circumference;

  return (
    <div className="flex items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#EAE3D4"
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E8A33D"
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            className="streak-dash transition-all duration-700"
            strokeDasharray={`${progress} ${circumference - progress}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl">🔥</span>
          <span className="font-display font-semibold text-ink text-lg leading-none">
            {streak}
          </span>
        </div>
      </div>
      <div>
        <p className="font-display font-semibold text-ink">
          {streak > 0 ? `${streak}-day streak` : "Start your streak"}
        </p>
        <div className="flex gap-1.5 mt-2">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium ${
                  weekLog[i]
                    ? "bg-ember text-ink"
                    : "bg-sand text-mute"
                }`}
              >
                {weekLog[i] ? "✓" : ""}
              </div>
              <span className="text-[9px] text-mute">{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
