"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/atoms/Button";

export function UserSummary() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Sesión iniciada como</p>
        <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{user.email}</p>
      </div>
      <Button onClick={logout} className="bg-red-600 hover:bg-red-500 dark:bg-red-600 dark:hover:bg-red-500 dark:text-white">
        Cerrar sesión
      </Button>
    </div>
  );
}
