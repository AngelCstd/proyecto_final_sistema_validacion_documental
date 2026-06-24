import type { StatusDocument } from '@prisma/client';
import { DocumentValidationEntity } from './document-validation.entity';

export const DOCUMENT_VALIDATION_REPOSITORY = Symbol(
  'DOCUMENT_VALIDATION_REPOSITORY',
);

export interface CreateValidationData {
  documentId: string;
  estadoEnConsulta: StatusDocument;
}

export interface IDocumentValidationRepository {
  create(data: CreateValidationData): Promise<DocumentValidationEntity>;
  findByDocumentId(id: string): Promise<DocumentValidationEntity[]>;
}
