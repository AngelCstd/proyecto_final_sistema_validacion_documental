import { AuthLayout } from "@/components/templates/AuthLayout";
import { ProtectedRoute } from "@/components/templates/ProtectedRoute";
import { UserSummary } from "@/components/organisms/UserSummary";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AuthLayout>
        <div className="flex h-full w-full items-start bg-amber-50"></div>
      </AuthLayout>
    </ProtectedRoute>
  );
}
