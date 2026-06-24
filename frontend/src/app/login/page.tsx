import { AuthLayout } from "@/components/templates/AuthLayout";
import { GuestRoute } from "@/components/templates/GuestRoute";
import { LoginForm } from "@/components/organisms/LoginForm";

export default function LoginPage() {
  return (
    <GuestRoute>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </GuestRoute>
  );
}
