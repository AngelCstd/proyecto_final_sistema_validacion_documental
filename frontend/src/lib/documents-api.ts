import { http } from "@/lib/api-client";
import type {
  CreateDocumentPayload,
  DocumentBitacora,
  DocumentRecord,
  DocumentValidation,
  UpdateDocumentPayload,
  UpdateDocumentResponse,
  ValidateFolioResponse,
} from "@/types/document";

export function listDocuments() {
  return http.get<DocumentRecord[]>("/documents");
}

export function getDocument(id: string) {
  return http.get<DocumentRecord>(`/documents/${id}`);
}

export function uploadDocument(payload: CreateDocumentPayload) {
  const formData = new FormData();
  formData.append("titulo", payload.titulo);
  formData.append("tipo", payload.tipo);
  formData.append("areaEmisora", payload.areaEmisora);
  formData.append("qrPosicion", payload.qrPosicion);
  formData.append("file", payload.file);

  return http.postForm<DocumentRecord>("/documents", formData);
}

export function validateFolio(folio: string) {
  return http.get<ValidateFolioResponse>(`/documents/validate/${folio}`);
}

export function updateDocumentEstado(
  id: string,
  payload: UpdateDocumentPayload,
) {
  return http.patch<UpdateDocumentResponse>(`/documents/${id}`, payload);
}

export function getValidations(documentId: string) {
  return http.get<DocumentValidation[]>(
    `/documents/${documentId}/validations`,
  );
}

export function getBitacora(documentId: string) {
  return http.get<DocumentBitacora[]>(`/documents/${documentId}/bitacora`);
}

// Descarga el PDF con QR y dispara la descarga en el navegador.
export async function downloadDocument(folio: string) {
  const blob = await http.getBlob(`/documents/${folio}/download`);
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${folio}.pdf`;
  link.click();

  URL.revokeObjectURL(url);
}
