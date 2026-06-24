"use client";

import { useParams } from "next/navigation";
import { ValidationResult } from "@/components/organisms/ValidationResult";

// Pública, sin guard: a esta página llega cualquiera que escanee el QR,
// con o sin sesión iniciada.
export default function ValidateFolioPage() {
  const params = useParams<{ folio: string }>();

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-zinc-100 px-4">
      <ValidationResult folio={params.folio} />
    </main>
  );
}
