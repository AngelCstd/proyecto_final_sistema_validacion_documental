import { StatusDocument } from '@prisma/client';

export class DocumentValidationEntity {
  id!: string;
  documentId!: string;
  estadoEnConsulta!: StatusDocument;
  validatedAt!: Date;
}
