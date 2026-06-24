import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { PrismaService } from '../../prisma/prisma.service';
import { DocumentBitacoraEntity } from './document-bitacora.entity';
import {
  CreateDocumentBitacoraData,
  IDocumentBitacoraRepository,
} from './document-bitacora.repository';

@Injectable()
export class PrismaDocumentBitacoraRepository implements IDocumentBitacoraRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateDocumentBitacoraData): Promise<DocumentBitacoraEntity> {
    return this.prisma.bitacora.create({ data });
  }
  findByDocumentId(documentId: string): Promise<DocumentBitacoraEntity[]> {
    return this.prisma.bitacora.findMany({
      where: { documentId },
    });
  }
  findByUserId(userId: string): Promise<DocumentBitacoraEntity[]> {
    return this.prisma.bitacora.findMany({
      where: { userId },
    });
  }
}
