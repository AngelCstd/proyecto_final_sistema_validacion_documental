"use client";

import { useValidateFolio } from "@/hooks/use-validate-folio";
import {
  documentStatusLabel,
  documentStatusVariant,
} from "@/lib/document-status";
import { TitleCard } from "@/components/molecules/TitleCard";
import { Badge } from "@/components/atoms/Badge";
import { Text } from "@/components/atoms/Text";
import { Spinner } from "@/components/atoms/Spinner";
import { FieldError } from "@/components/atoms/FieldError";

export function ValidationResult({ folio }: { folio: string }) {
  const { result, isLoading, error } = useValidateFolio(folio);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <FieldError message={error} />;
  }

  if (!result || !result.encontrado) {
    return (
      <TitleCard title="Documento no encontrado">
        <Text variant="paragraph" size="sm">
          No existe ningún documento registrado con el folio{" "}
          <span className="font-mono">{folio}</span>.
        </Text>
      </TitleCard>
    );
  }

  return (
    <TitleCard title={result.titulo}>
      <div className="flex flex-col gap-3">
        <div>
          <Text variant="small" size="sm">
            Folio
          </Text>
          <Text variant="paragraph" size="sm" className="font-mono">
            {result.folio}
          </Text>
        </div>
        <Badge variant={documentStatusVariant[result.estado]} className="w-fit">
          {documentStatusLabel[result.estado]}
        </Badge>
      </div>
    </TitleCard>
  );
}
