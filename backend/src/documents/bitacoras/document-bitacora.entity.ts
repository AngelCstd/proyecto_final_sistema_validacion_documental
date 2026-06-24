import { ActionBitacora } from '@prisma/client';

export class DocumentBitacoraEntity {
  id!: string;
  action!: ActionBitacora;
  userId!: string;
  documentId!: string;
  createdAt!: Date;
}

// Lo que regresa findByDocumentId: la fila de bitácora + el nombre de quien
// hizo la acción (nunca el password ni otros campos sensibles del usuario).
export class DocumentBitacoraWithUserEntity extends DocumentBitacoraEntity {
  user!: { nombre: string };
}
