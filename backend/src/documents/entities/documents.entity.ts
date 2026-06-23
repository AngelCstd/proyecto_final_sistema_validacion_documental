import { StatusDocument, QrPosition } from '@prisma/client';

export class DocumentEntity {
  id!: string;
  folio!: string;
  titulo!: string;
  tipo!: string;
  areaEmisora!: string;
  estado!: StatusDocument;
  qrPosicion!: QrPosition;
  originalPdfPath!: string;
  qrPdfPath!: string;
  qrImagePath!: string;
  createdById!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
