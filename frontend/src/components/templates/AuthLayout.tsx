import type { ReactNode } from "react";
import { UserSummary } from "../organisms/UserSummary";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-screen w-screen flex-col">
      <div className="flex items-center justify-end bg-white px-4 py-2 shadow-md">
        <UserSummary />
      </div>
      <div className="flex flex-1 items-center justify-center bg-zinc-100 px-4 py-4">
        {children}
      </div>
    </main>
  );
}
