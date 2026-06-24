import { Injectable } from '@nestjs/common';
import {
  CreateDocumentData,
  IDocumentRepository,
  UpdateDocumentData,
} from './documents.repository';
import { DocumentEntity } from '../entities/documents.entity';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PrismaDocumentsRepository implements IDocumentRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<DocumentEntity[]> {
    return this.prisma.document.findMany();
  }

  findByFolio(folio: string): Promise<DocumentEntity | null> {
    return this.prisma.document.findUnique({ where: { folio } });
  }
  create(data: CreateDocumentData): Promise<DocumentEntity> {
    return this.prisma.document.create({ data });
  }
  update(id: string, data: UpdateDocumentData): Promise<DocumentEntity> {
    return this.prisma.document.update({ where: { id }, data });
  }
}
