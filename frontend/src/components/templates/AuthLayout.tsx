import type { ReactNode } from "react";
import { UserSummary } from "../organisms/UserSummary";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-screen w-screen flex-col">
      <div className="flex items-center justify-end bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
        <UserSummary />
      </div>
      <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-4 dark:bg-black">
        {children}
      </div>
    </main>
  );
}
