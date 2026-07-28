import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { BottomNav } from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "ARM SAVVY — Investing, learned by doing",
  description:
    "ARM One reimagined: a learning-first, AI-guided, socially engaging investment experience for first-time and early-career investors.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <StoreProvider>
          <main className="mx-auto max-w-md min-h-screen pb-24">
            {children}
          </main>
          <BottomNav />
        </StoreProvider>
      </body>
    </html>
  );
}
