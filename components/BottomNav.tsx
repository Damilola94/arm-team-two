"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, GraduationCap, Users, Target } from "lucide-react";

const TABS = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/ammy", label: "Ammy", icon: Sparkles },
  { href: "/learn", label: "Learn", icon: GraduationCap },
  { href: "/community", label: "Community", icon: Users },
  { href: "/goals", label: "Goals", icon: Target },
];

export function BottomNav() {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/onboarding") return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-sand bg-cream/95 backdrop-blur">
      <div className="mx-auto max-w-md grid grid-cols-5">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`focus-ring flex flex-col items-center gap-1 py-3 text-[11px] font-medium transition-colors ${
                active ? "text-magenta" : "text-mute"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.4 : 1.8} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
