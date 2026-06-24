import type { BitacoraAction } from "@/types/document";

export const bitacoraActionLabel: Record<BitacoraAction, string> = {
  CREATE: "Creó el documento",
  REVOKE: "Revocó el documento",
  CANCEL: "Canceló el documento",
};
