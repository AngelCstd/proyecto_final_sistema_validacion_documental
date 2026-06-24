import { AuthLayout } from "@/components/templates/AuthLayout";
import { GuestRoute } from "@/components/templates/GuestRoute";
import { RegisterForm } from "@/components/organisms/RegisterForm";

export default function RegisterPage() {
  return (
    <GuestRoute>
      <AuthLayout>
        <RegisterForm />
      </AuthLayout>
    </GuestRoute>
  );
}
