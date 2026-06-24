"use client";

import { useDocumentBitacora } from "@/hooks/use-document-bitacora";
import { bitacoraActionLabel } from "@/lib/bitacora-action";
import { Text } from "@/components/atoms/Text";
import { Spinner } from "@/components/atoms/Spinner";
import { FieldError } from "@/components/atoms/FieldError";

export function DocumentBitacoraList({ documentId }: { documentId: string }) {
  const { bitacora, isLoading, error } = useDocumentBitacora(documentId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-6">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <FieldError message={error} />;
  }

  if (bitacora.length === 0) {
    return (
      <Text variant="paragraph" size="sm">
        Sin movimientos registrados para este documento.
      </Text>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {bitacora.map((entry) => (
        <li
          key={entry.id}
          className="flex items-center justify-between rounded-md border border-zinc-200 px-3 py-2 dark:border-zinc-800"
        >
          <div>
            <Text variant="paragraph" size="sm">
              {bitacoraActionLabel[entry.action]}
            </Text>
            <Text variant="small" size="sm" className="text-zinc-500 dark:text-zinc-500">
              {entry.user.nombre}
            </Text>
          </div>
          <Text variant="small" size="sm">
            {new Date(entry.createdAt).toLocaleString()}
          </Text>
        </li>
      ))}
    </ul>
  );
}
