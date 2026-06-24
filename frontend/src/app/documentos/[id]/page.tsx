"use client";

import { useParams } from "next/navigation";
import { AuthLayout } from "@/components/templates/AuthLayout";
import { ProtectedRoute } from "@/components/templates/ProtectedRoute";
import { DocumentDetail } from "@/components/organisms/DocumentDetail";

export default function DocumentDetailPage() {
  const params = useParams<{ id: string }>();

  return (
    <ProtectedRoute>
      <AuthLayout>
        <DocumentDetail id={params.id} />
      </AuthLayout>
    </ProtectedRoute>
  );
}
