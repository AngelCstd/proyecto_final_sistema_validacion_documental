"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useDocument } from "@/hooks/use-document";
import { useUpdateDocumentEstado } from "@/hooks/use-update-document-estado";
import {
  documentStatusLabel,
  documentStatusVariant,
} from "@/lib/document-status";
import { qrPositionLabel } from "@/lib/qr-position";
import { Badge } from "@/components/atoms/Badge";
import { Text } from "@/components/atoms/Text";
import { Spinner } from "@/components/atoms/Spinner";
import { FieldError } from "@/components/atoms/FieldError";
import { Button } from "@/components/atoms/Button";
import { DownloadDocumentButton } from "@/components/molecules/DownloadDocumentButton";
import { DocumentValidationsList } from "@/components/organisms/DocumentValidationsList";
import { DocumentBitacoraList } from "@/components/organisms/DocumentBitacoraList";

type Tab = "info" | "validaciones" | "bitacora";

const TABS: { id: Tab; label: string }[] = [
  { id: "info", label: "Información" },
  { id: "validaciones", label: "Validaciones" },
  { id: "bitacora", label: "Bitácora" },
];

export function DocumentDetail({ id }: { id: string }) {
  const { user } = useAuth();
  const isAdmin = user?.rol === "ADMIN";
  const visibleTabs = isAdmin ? TABS : TABS.filter((tab) => tab.id === "info");
  const { document, isLoading, error, refresh } = useDocument(id);
  const [activeTab, setActiveTab] = useState<Tab>("info");
  const {
    updateEstado,
    isSubmitting: isUpdatingEstado,
    error: updateError,
  } = useUpdateDocumentEstado(id, refresh);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center py-8">
        <Spinner />
      </div>
    );
  }

  if (error || !document) {
    return <FieldError message={error ?? "Documento no encontrado."} />;
  }

  return (
    <div className="flex w-full max-w-2xl flex-col gap-4 bg-white p-6 rounded-md shadow-sm">
      <div className="flex items-center justify-between">
        <Text variant="title" size="sm">
          {document.titulo}
        </Text>
        <Badge variant={documentStatusVariant[document.estado]}>
          {documentStatusLabel[document.estado]}
        </Badge>
      </div>

      <div className="flex gap-2 border-b border-zinc-300">
        {visibleTabs.map((tab) => (
          <Button
            key={tab.id}
            type="button"
            size="sm"
            fullWidth={false}
            variant={activeTab === tab.id ? "primary" : "secondary"}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {activeTab === "info" ? (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Text variant="small" size="sm">
                Folio
              </Text>
              <Text variant="paragraph" size="sm" className="font-mono">
                {document.folio}
              </Text>
            </div>
            <div>
              <Text variant="small" size="sm">
                Tipo
              </Text>
              <Text variant="paragraph" size="sm">
                {document.tipo}
              </Text>
            </div>
            <div>
              <Text variant="small" size="sm">
                Área emisora
              </Text>
              <Text variant="paragraph" size="sm">
                {document.areaEmisora}
              </Text>
            </div>
            <div>
              <Text variant="small" size="sm">
                Posición del QR
              </Text>
              <Text variant="paragraph" size="sm">
                {qrPositionLabel[document.qrPosicion]}
              </Text>
            </div>
            <div>
              <Text variant="small" size="sm">
                Fecha de registro
              </Text>
              <Text variant="paragraph" size="sm">
                {new Date(document.createdAt).toLocaleString()}
              </Text>
            </div>
          </div>
          <DownloadDocumentButton folio={document.folio} />

          {document.estado === "VIGENTE" && user?.rol === "ADMIN" ? (
            <div className="flex flex-col gap-2 border-t border-zinc-200 pt-3">
              <Text variant="small" size="sm">
                Acciones
              </Text>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  fullWidth={false}
                  isLoading={isUpdatingEstado}
                  onClick={() => updateEstado("REVOCADO")}
                >
                  Revocar
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  fullWidth={false}
                  isLoading={isUpdatingEstado}
                  onClick={() => updateEstado("CANCELADO")}
                >
                  Cancelar
                </Button>
              </div>
              <FieldError message={updateError} />
            </div>
          ) : null}
        </div>
      ) : null}

      {activeTab === "validaciones" && isAdmin ? (
        <DocumentValidationsList documentId={document.id} />
      ) : null}

      {activeTab === "bitacora" && isAdmin ? (
        <DocumentBitacoraList documentId={document.id} />
      ) : null}
    </div>
  );
}
