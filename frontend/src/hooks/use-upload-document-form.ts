"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api-client";
import { uploadDocument } from "@/lib/documents-api";
import type { QrPosition } from "@/types/document";

const DEFAULT_QR_POSICION: QrPosition = "INFERIOR_DERECHA";

export function useUploadDocumentForm() {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [areaEmisora, setAreaEmisora] = useState("");
  const [qrPosicion, setQrPosicion] = useState<QrPosition>(
    DEFAULT_QR_POSICION,
  );
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!file) {
      setError("Selecciona el PDF del documento.");
      return;
    }

    setIsSubmitting(true);

    try {
      const document = await uploadDocument({
        titulo,
        tipo,
        areaEmisora,
        qrPosicion,
        file,
      });
      router.push(`/documentos/${document.id}`);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "No se pudo subir el documento.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    titulo,
    setTitulo,
    tipo,
    setTipo,
    areaEmisora,
    setAreaEmisora,
    qrPosicion,
    setQrPosicion,
    file,
    setFile,
    error,
    isSubmitting,
    handleSubmit,
  };
}
