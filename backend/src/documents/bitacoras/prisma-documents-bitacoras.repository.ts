import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  DocumentBitacoraEntity,
  DocumentBitacoraWithUserEntity,
} from './document-bitacora.entity';
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
  findByDocumentId(
    documentId: string,
  ): Promise<DocumentBitacoraWithUserEntity[]> {
    return this.prisma.bitacora.findMany({
      where: { documentId },
      include: { user: { select: { nombre: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
  findByUserId(userId: string): Promise<DocumentBitacoraEntity[]> {
    return this.prisma.bitacora.findMany({
      where: { userId },
    });
  }
}
