"use client";

import { useLoginForm } from "@/hooks/use-login-form";
import { TitleCard } from "@/components/molecules/TitleCard";
import { FormField } from "@/components/molecules/FormField";
import { Button } from "@/components/atoms/Button";
import { FieldError } from "@/components/atoms/FieldError";

export function LoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isSubmitting,
    handleSubmit,
  } = useLoginForm();

  return (
    <TitleCard title="Inicia sesión">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <FormField
          id="password"
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <FieldError message={error} />
        <Button type="submit" isLoading={isSubmitting}>
          Entrar
        </Button>
      </form>
    </TitleCard>
  );
}
