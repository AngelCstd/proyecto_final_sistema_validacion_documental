import type { ReactNode } from "react";

export function TitleCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h1 className="mb-6 text-xl font-semibold text-zinc-900">{title}</h1>
      {children}
    </div>
  );
}
