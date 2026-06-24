import type { QrPosition } from "@/types/document";

export const qrPositionLabel: Record<QrPosition, string> = {
  SUPERIOR_DERECHA: "Superior derecha",
  SUPERIOR_IZQUIERDA: "Superior izquierda",
  INFERIOR_DERECHA: "Inferior derecha",
  INFERIOR_IZQUIERDA: "Inferior izquierda",
  ULTIMA_PAGINA_INFERIOR_DERECHA: "Última página, inferior derecha",
};

export const qrPositionOptions = Object.entries(qrPositionLabel) as [
  QrPosition,
  string,
][];
