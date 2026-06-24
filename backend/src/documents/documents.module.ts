import { Module } from '@nestjs/common';
import { PrismaDocumentValidationRepository } from './validations/prisma-documents-validations';
import { PrismaDocumentBitacoraRepository } from './bitacoras/prisma-documents-bitacoras.repository';
import { PrismaDocumentsRepository } from './repositories/prisma-documents.repository';
import { DOCUMENT_VALIDATION_REPOSITORY } from './validations/document-validation.repository';
import { DOCUMENT_BITACORA_REPOSITORY } from './bitacoras/document-bitacora.repository';
import { DOCUMENT_REPOSITORY } from './repositories/documents.repository';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';

@Module({
  controllers: [DocumentsController],
  providers: [
    DocumentsService,
    {
      provide: DOCUMENT_VALIDATION_REPOSITORY,
      useClass: PrismaDocumentValidationRepository,
    },
    {
      provide: DOCUMENT_BITACORA_REPOSITORY,
      useClass: PrismaDocumentBitacoraRepository,
    },
    {
      provide: DOCUMENT_REPOSITORY,
      useClass: PrismaDocumentsRepository,
    },
  ],
})
export class DocumentsModule {}
