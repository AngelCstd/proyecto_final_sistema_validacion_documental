import { ActionBitacora } from '@prisma/client';

export class DocumentBitacoraEntity {
  id!: string;
  action!: ActionBitacora;
  userId!: string;
  documentId!: string;
  createdAt!: Date;
}
