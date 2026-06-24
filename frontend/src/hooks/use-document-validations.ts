"use client";

import { useEffect, useState } from "react";
import { ApiError } from "@/lib/api-client";
import { getValidations } from "@/lib/documents-api";
import type { DocumentValidation } from "@/types/document";

export function useDocumentValidations(documentId: string) {
  const [validations, setValidations] = useState<DocumentValidation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getValidations(documentId)
      .then(setValidations)
      .catch((err) =>
        setError(
          err instanceof ApiError
            ? err.message
            : "No se pudieron cargar las validaciones.",
        ),
      )
      .finally(() => setIsLoading(false));
  }, [documentId]);

  return { validations, isLoading, error };
}
