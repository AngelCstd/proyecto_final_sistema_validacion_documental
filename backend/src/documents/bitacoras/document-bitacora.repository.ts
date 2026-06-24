import { ActionBitacora } from '@prisma/client';
import {
  DocumentBitacoraEntity,
  DocumentBitacoraWithUserEntity,
} from './document-bitacora.entity';

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
  findByDocumentId(
    documentId: string,
  ): Promise<DocumentBitacoraWithUserEntity[]>;
  findByUserId(userId: string): Promise<DocumentBitacoraEntity[]>;
}
