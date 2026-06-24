"use client";

import Link from "next/link";
import { useDocuments } from "@/hooks/use-documents";
import {
  documentStatusLabel,
  documentStatusVariant,
} from "@/lib/document-status";
import { Badge } from "@/components/atoms/Badge";
import { Text } from "@/components/atoms/Text";
import { Spinner } from "@/components/atoms/Spinner";
import { FieldError } from "@/components/atoms/FieldError";
import { DownloadDocumentButton } from "@/components/molecules/DownloadDocumentButton";

export function DocumentsTable() {
  const { documents, isLoading, error } = useDocuments();

  if (isLoading) {
    return (
      <div className="flex w-full justify-center py-8">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <FieldError message={error} />;
  }

  if (documents.length === 0) {
    return (
      <Text variant="paragraph">Todavía no hay documentos registrados.</Text>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm rounded-md shadow-sm">
        <thead className="bg-zinc-50 text-zinc-900">
          <tr className="border-b border-zinc-200">
            <th className="px-3 py-2">Folio</th>
            <th className="px-3 py-2">Título</th>
            <th className="px-3 py-2">Tipo</th>
            <th className="px-3 py-2">Área</th>
            <th className="px-3 py-2">Fecha</th>
            <th className="px-3 py-2">Estado</th>
            <th className="px-3 py-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 text-zinc-700">
          {documents.map((document) => (
            <tr key={document.id} className="border-b border-zinc-100">
              <td className="px-3 py-2 font-mono text-xs">{document.folio}</td>
              <td className="px-3 py-2">
                <Link
                  href={`/documentos/${document.id}`}
                  className="font-medium text-zinc-900 underline"
                >
                  {document.titulo}
                </Link>
              </td>
              <td className="px-3 py-2">{document.tipo}</td>
              <td className="px-3 py-2">{document.areaEmisora}</td>
              <td className="px-3 py-2">
                {new Date(document.createdAt).toLocaleDateString()}
              </td>
              <td className="px-3 py-2">
                <Badge variant={documentStatusVariant[document.estado]}>
                  {documentStatusLabel[document.estado]}
                </Badge>
              </td>
              <td className="px-3 py-2">
                <div className="flex items-start gap-2">
                  <Link
                    href={`/validate/${document.folio}`}
                    className="inline-flex items-center justify-center rounded-md bg-black px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-zinc-200 text-nowrap"
                  >
                    Ver validación
                  </Link>
                  <DownloadDocumentButton folio={document.folio} />
                  <Link
                    href={`/documentos/${document.id}`}
                    className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium text-zinc-800 transition-colors hover:bg-zinc-200 text-nowrap"
                  >
                    Ver detalle
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
