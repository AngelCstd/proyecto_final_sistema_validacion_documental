import type { QrPosition, StatusDocument } from '@prisma/client';
import { DocumentEntity } from '../entities/documents.entity';

export const DOCUMENT_REPOSITORY = Symbol('DOCUMENT_REPOSITORY');

export interface CreateDocumentData {
  folio: string;
  titulo: string;
  tipo: string;
  areaEmisora: string;
  qrPosicion: QrPosition;
  originalPdfPath: string;
  qrPdfPath: string;
  qrImagePath: string;
  createdById: string;
}

export interface UpdateDocumentData {
  estado: StatusDocument;
}

export interface IDocumentRepository {
  findById(id: string): Promise<DocumentEntity | null>;
  create(data: CreateDocumentData): Promise<DocumentEntity>;
  update(id: string, data: UpdateDocumentData): Promise<DocumentEntity>;
  delete(id: string): Promise<void>;
}
