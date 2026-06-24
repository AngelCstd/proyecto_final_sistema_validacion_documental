import Link from "next/link";
import { AuthLayout } from "@/components/templates/AuthLayout";
import { ProtectedRoute } from "@/components/templates/ProtectedRoute";
import { DocumentsTable } from "@/components/organisms/DocumentsTable";
import { Text } from "@/components/atoms/Text";

export default function DocumentsPage() {
  return (
    <ProtectedRoute>
      <AuthLayout>
        <div className="flex w-full max-w-6xl flex-col gap-4 bg-white p-6 rounded-md shadow-sm">
          <div className="flex items-center justify-between">
            <Text variant="subtitle">Documentos</Text>
            <Link
              href="/documentos/nuevo"
              className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
            >
              Subir documento
            </Link>
          </div>
          <DocumentsTable />
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
}
