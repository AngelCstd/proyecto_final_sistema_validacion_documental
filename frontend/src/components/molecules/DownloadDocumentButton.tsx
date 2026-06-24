"use client";

import { useState } from "react";
import { downloadDocument } from "@/lib/documents-api";
import { ApiError } from "@/lib/api-client";
import { Button } from "@/components/atoms/Button";

export function DownloadDocumentButton({ folio }: { folio: string }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setError(null);
    setIsDownloading(true);

    try {
      await downloadDocument(folio);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo descargar.");
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <Button
        type="button"
        variant="secondary"
        size="sm"
        fullWidth={false}
        isLoading={isDownloading}
        onClick={handleClick}
      >
        Descargar
      </Button>
      {error ? (
        <span className="text-xs text-red-600 dark:text-red-400">{error}</span>
      ) : null}
    </div>
  );
}
