import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ActionBitacora, QrPosition, StatusDocument } from '@prisma/client';
import { PDFDocument, type PDFPage } from 'pdf-lib';
import * as QRCode from 'qrcode';
import {
  DOCUMENT_BITACORA_REPOSITORY,
  type IDocumentBitacoraRepository,
} from './bitacoras/document-bitacora.repository';
import {
  DOCUMENT_REPOSITORY,
  type CreateDocumentData,
  type IDocumentRepository,
} from './repositories/documents.repository';
import {
  DOCUMENT_VALIDATION_REPOSITORY,
  type IDocumentValidationRepository,
} from './validations/document-validation.repository';
import { randomUUID } from 'crypto';
import type { CreateDocumentDto } from './dto/create-document.dto';

const QR_SIZE = 80;
const QR_MARGIN = 20;

@Injectable()
export class DocumentsService {
  constructor(
    @Inject(DOCUMENT_REPOSITORY)
    private readonly documentRepository: IDocumentRepository,
    @Inject(DOCUMENT_VALIDATION_REPOSITORY)
    private readonly validationRepository: IDocumentValidationRepository,
    @Inject(DOCUMENT_BITACORA_REPOSITORY)
    private readonly bitacoraRepository: IDocumentBitacoraRepository,
    private readonly configService: ConfigService,
  ) {}

  async validateByFolio(folio: string) {
    const document = await this.documentRepository.findByFolio(folio);

    if (!document) {
      return { encontrado: false as const };
    }

    await this.validationRepository.create({
      documentId: document.id,
      estadoEnConsulta: document.estado,
    });

    return {
      encontrado: true as const,
      folio: document.folio,
      titulo: document.titulo,
      estado: document.estado,
    };
  }

  async getValidations(documentId: string) {
    return this.validationRepository.findByDocumentId(documentId);
  }

  async getBitacora(documentId: string) {
    return this.bitacoraRepository.findByDocumentId(documentId);
  }

  async guardarDocumento(data: CreateDocumentData) {
    const document = await this.documentRepository.create(data);

    await this.bitacoraRepository.create({
      documentId: document.id,
      userId: data.createdById,
      action: ActionBitacora.CREATE,
    });

    return document;
  }

  async getDocuments() {
    return this.documentRepository.findAll();
  }

  async downloadDocument(folio: string) {
    const document = await this.documentRepository.findByFolio(folio);

    if (!document) {
      throw new NotFoundException('Documento no encontrado');
    }

    return {
      originalPdfPath: document.originalPdfPath,
      qrPdfPath: document.qrPdfPath,
    };
  }

  async actualizarDocumento(
    id: string,
    estado: StatusDocument,
    userId: string,
  ) {
    await this.documentRepository.update(id, { estado });

    await this.bitacoraRepository.create({
      documentId: id,
      userId,
      action:
        estado === StatusDocument.REVOCADO
          ? ActionBitacora.REVOKE
          : ActionBitacora.CANCEL,
    });

    return { id, estado, userId };
  }

  async crearDocumentoConQr(
    file: Express.Multer.File,
    input: CreateDocumentDto,
    userId: string,
  ) {
    const folio = `F_${randomUUID()}`;
    const frontendUrl = this.configService.get<string>(
      'FRONTEND_URL',
      'http://localhost:3001',
    );
    const validationUrl = `${frontendUrl}/validate/${folio}`;

    const qrImageFileName = `${folio}.png`;
    const qrImageFullPath = join(
      process.cwd(),
      'uploads',
      'qr-images',
      qrImageFileName,
    );
    await QRCode.toFile(qrImageFullPath, validationUrl);

    const originalPdfFullPath = join(
      process.cwd(),
      'uploads',
      'originals',
      file.filename,
    );
    const pdfDoc = await PDFDocument.load(await readFile(originalPdfFullPath));
    const qrPngImage = await pdfDoc.embedPng(await readFile(qrImageFullPath));

    const { page, x, y } = this.getQrPlacement(pdfDoc, input.qrPosicion);
    page.drawImage(qrPngImage, { x, y, width: QR_SIZE, height: QR_SIZE });

    const qrPdfFileName = `${folio}.pdf`;
    const qrPdfFullPath = join(
      process.cwd(),
      'uploads',
      'with-qr',
      qrPdfFileName,
    );
    await writeFile(qrPdfFullPath, await pdfDoc.save());

    return this.guardarDocumento({
      folio: folio,
      titulo: input.titulo,
      tipo: input.tipo,
      areaEmisora: input.areaEmisora,
      qrPosicion: input.qrPosicion,
      originalPdfPath: `originals/${file.filename}`,
      qrPdfPath: `with-qr/${qrPdfFileName}`,
      qrImagePath: `qr-images/${qrImageFileName}`,
      createdById: userId,
    });
  }

  private getQrPlacement(
    pdfDoc: PDFDocument,
    qrPosicion: QrPosition,
  ): { page: PDFPage; x: number; y: number } {
    const pages = pdfDoc.getPages();
    const page =
      qrPosicion === QrPosition.ULTIMA_PAGINA_INFERIOR_DERECHA
        ? pages[pages.length - 1]
        : pages[0];

    const { width, height } = page.getSize();

    const positions: Record<QrPosition, { x: number; y: number }> = {
      SUPERIOR_DERECHA: {
        x: width - QR_SIZE - QR_MARGIN,
        y: height - QR_SIZE - QR_MARGIN,
      },
      SUPERIOR_IZQUIERDA: { x: QR_MARGIN, y: height - QR_SIZE - QR_MARGIN },
      INFERIOR_DERECHA: { x: width - QR_SIZE - QR_MARGIN, y: QR_MARGIN },
      INFERIOR_IZQUIERDA: { x: QR_MARGIN, y: QR_MARGIN },
      ULTIMA_PAGINA_INFERIOR_DERECHA: {
        x: width - QR_SIZE - QR_MARGIN,
        y: QR_MARGIN,
      },
    };

    return { page, ...positions[qrPosicion] };
  }
}
