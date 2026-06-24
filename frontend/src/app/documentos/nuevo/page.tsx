import { AuthLayout } from "@/components/templates/AuthLayout";
import { ProtectedRoute } from "@/components/templates/ProtectedRoute";
import { DocumentUploadForm } from "@/components/organisms/DocumentUploadForm";

export default function NewDocumentPage() {
  return (
    <ProtectedRoute>
      <AuthLayout>
        <DocumentUploadForm />
      </AuthLayout>
    </ProtectedRoute>
  );
}
