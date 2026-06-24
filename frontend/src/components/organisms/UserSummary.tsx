"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";

export function UserSummary() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="flex w-full justify-between">
      <div>
        <Text>Sesión iniciada como</Text>
        <Text variant="subtitle">{user.nombre}</Text>
      </div>
      <div className="flex items-center">
        <Button onClick={logout}>Cerrar sesión</Button>
      </div>
    </div>
  );
}
