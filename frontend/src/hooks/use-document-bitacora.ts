"use client";

import { useEffect, useState } from "react";
import { ApiError } from "@/lib/api-client";
import { getBitacora } from "@/lib/documents-api";
import type { DocumentBitacora } from "@/types/document";

export function useDocumentBitacora(documentId: string) {
  const [bitacora, setBitacora] = useState<DocumentBitacora[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getBitacora(documentId)
      .then(setBitacora)
      .catch((err) =>
        setError(
          err instanceof ApiError
            ? err.message
            : "No se pudo cargar la bitácora.",
        ),
      )
      .finally(() => setIsLoading(false));
  }, [documentId]);

  return { bitacora, isLoading, error };
}
