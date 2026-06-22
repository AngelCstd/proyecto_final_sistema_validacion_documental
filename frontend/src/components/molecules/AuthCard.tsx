import type { ReactNode } from "react";

export function AuthCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h1 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">{title}</h1>
      {children}
    </div>
  );
}
