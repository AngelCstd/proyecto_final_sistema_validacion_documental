"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiError } from "@/lib/api-client";
import { getDocument } from "@/lib/documents-api";
import type { DocumentRecord } from "@/types/document";

export function useDocument(id: string) {
  const [document, setDocument] = useState<DocumentRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    setIsLoading(true);
    setError(null);

    return getDocument(id)
      .then(setDocument)
      .catch((err) =>
        setError(
          err instanceof ApiError
            ? err.message
            : "No se pudo cargar el documento.",
        ),
      )
      .finally(() => setIsLoading(false));
  }, [id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { document, isLoading, error, refresh };
}
