"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export function RequireOnboarded({ children }: { children: React.ReactNode }) {
  const { user, ready } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user.onboarded) {
      router.replace("/onboarding");
    }
  }, [ready, user.onboarded, router]);

  if (!ready || !user.onboarded) return null;
  return <>{children}</>;
}
