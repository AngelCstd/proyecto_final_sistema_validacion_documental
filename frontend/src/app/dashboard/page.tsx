import { AuthLayout } from "@/components/templates/AuthLayout";
import { ProtectedRoute } from "@/components/templates/ProtectedRoute";
import { UserSummary } from "@/components/organisms/UserSummary";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AuthLayout>
        <UserSummary />
      </AuthLayout>
    </ProtectedRoute>
  );
}
