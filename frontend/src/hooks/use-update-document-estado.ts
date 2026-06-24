"use client";

import { useState } from "react";
import { ApiError } from "@/lib/api-client";
import { updateDocumentEstado } from "@/lib/documents-api";
import type { DocumentStatus } from "@/types/document";

export function useUpdateDocumentEstado(
  documentId: string,
  onUpdated: () => void,
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function updateEstado(estado: DocumentStatus) {
    setError(null);
    setIsSubmitting(true);

    try {
      await updateDocumentEstado(documentId, { estado });
      onUpdated();
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "No se pudo actualizar el documento.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return { updateEstado, isSubmitting, error };
}
