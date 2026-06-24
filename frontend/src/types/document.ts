export type DocumentStatus = "VIGENTE" | "REVOCADO" | "CANCELADO";

export type QrPosition =
  | "SUPERIOR_DERECHA"
  | "SUPERIOR_IZQUIERDA"
  | "INFERIOR_DERECHA"
  | "INFERIOR_IZQUIERDA"
  | "ULTIMA_PAGINA_INFERIOR_DERECHA";

// Lo que regresa GET /documents (listado) y POST /documents (al crear).
export interface DocumentRecord {
  id: string;
  folio: string;
  titulo: string;
  tipo: string;
  areaEmisora: string;
  estado: DocumentStatus;
  qrPosicion: QrPosition;
  originalPdfPath: string;
  qrPdfPath: string;
  qrImagePath: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
}

// Lo que se manda a POST /documents (multipart/form-data: campos + archivo).
export interface CreateDocumentPayload {
  titulo: string;
  tipo: string;
  areaEmisora: string;
  qrPosicion: QrPosition;
  file: File;
}

// Lo que se manda a PATCH /documents/:id.
export interface UpdateDocumentPayload {
  estado: DocumentStatus;
}

// Lo que regresa PATCH /documents/:id.
export interface UpdateDocumentResponse {
  id: string;
  estado: DocumentStatus;
  userId: string;
}

// Lo que regresa GET /documents/validate/:folio (página pública, sin login).
export type ValidateFolioResponse =
  | { encontrado: false }
  | {
      encontrado: true;
      folio: string;
      titulo: string;
      estado: DocumentStatus;
    };

// Lo que regresa GET /documents/:id/validations (historial de consultas).
export interface DocumentValidation {
  id: string;
  documentId: string;
  estadoEnConsulta: DocumentStatus;
  validatedAt: string;
}

export type BitacoraAction = "CREATE" | "REVOKE" | "CANCEL";

// Lo que regresa GET /documents/:id/bitacora (historial de acciones internas).
export interface DocumentBitacora {
  id: string;
  action: BitacoraAction;
  userId: string;
  documentId: string;
  createdAt: string;
  user: { nombre: string };
}
