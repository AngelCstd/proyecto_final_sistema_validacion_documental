import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DocumentValidationEntity } from './document-validation.entity';
import {
  CreateValidationData,
  IDocumentValidationRepository,
} from './document-validation.repository';

@Injectable()
export class PrismaDocumentValidationRepository implements IDocumentValidationRepository {
  constructor(private readonly prisma: PrismaService) {}
  create(data: CreateValidationData): Promise<DocumentValidationEntity> {
    return this.prisma.documentValidation.create({ data });
  }
  findByDocumentId(id: string): Promise<DocumentValidationEntity[]> {
    return this.prisma.documentValidation.findMany({
      where: { documentId: id },
    });
  }
}
