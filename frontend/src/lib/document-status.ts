import type { DocumentStatus } from "@/types/document";

export const documentStatusLabel: Record<DocumentStatus, string> = {
  VIGENTE: "Vigente",
  REVOCADO: "Revocado",
  CANCELADO: "Cancelado",
};

export const documentStatusVariant: Record<
  DocumentStatus,
  "success" | "danger" | "warning"
> = {
  VIGENTE: "success",
  REVOCADO: "danger",
  CANCELADO: "warning",
};
