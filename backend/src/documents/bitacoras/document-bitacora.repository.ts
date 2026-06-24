import { ActionBitacora } from '@prisma/client';
import { DocumentBitacoraEntity } from './document-bitacora.entity';

export const DOCUMENT_BITACORA_REPOSITORY = Symbol(
  'DOCUMENT_BITACORA_REPOSITORY',
);

export interface CreateDocumentBitacoraData {
  action: ActionBitacora;
  userId: string;
  documentId: string;
}

export interface IDocumentBitacoraRepository {
  create(data: CreateDocumentBitacoraData): Promise<DocumentBitacoraEntity>;
  findByDocumentId(documentId: string): Promise<DocumentBitacoraEntity[]>;
  findByUserId(userId: string): Promise<DocumentBitacoraEntity[]>;
}
