"use client";

import { useEffect, useState } from "react";
import { ApiError } from "@/lib/api-client";
import { validateFolio } from "@/lib/documents-api";
import type { ValidateFolioResponse } from "@/types/document";

export function useValidateFolio(folio: string) {
  const [result, setResult] = useState<ValidateFolioResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    validateFolio(folio)
      .then(setResult)
      .catch((err) =>
        setError(
          err instanceof ApiError
            ? err.message
            : "No se pudo validar el documento.",
        ),
      )
      .finally(() => setIsLoading(false));
  }, [folio]);

  return { result, isLoading, error };
}
