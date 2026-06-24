"use client";

import { useDocumentValidations } from "@/hooks/use-document-validations";
import {
  documentStatusLabel,
  documentStatusVariant,
} from "@/lib/document-status";
import { Badge } from "@/components/atoms/Badge";
import { Text } from "@/components/atoms/Text";
import { Spinner } from "@/components/atoms/Spinner";
import { FieldError } from "@/components/atoms/FieldError";

export function DocumentValidationsList({
  documentId,
}: {
  documentId: string;
}) {
  const { validations, isLoading, error } = useDocumentValidations(documentId);

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

  if (validations.length === 0) {
    return (
      <Text variant="paragraph" size="sm">
        Este documento todavía no ha sido consultado en la página pública.
      </Text>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {validations.map((validation) => (
        <li
          key={validation.id}
          className="flex items-center justify-between rounded-md border border-zinc-200 px-3 py-2 dark:border-zinc-800"
        >
          <Text variant="paragraph" size="sm">
            {new Date(validation.validatedAt).toLocaleString()}
          </Text>
          <Badge variant={documentStatusVariant[validation.estadoEnConsulta]}>
            {documentStatusLabel[validation.estadoEnConsulta]}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
