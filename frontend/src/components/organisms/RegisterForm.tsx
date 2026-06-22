"use client";

import Link from "next/link";
import { useRegisterForm } from "@/hooks/use-register-form";
import { AuthCard } from "@/components/molecules/AuthCard";
import { FormField } from "@/components/molecules/FormField";
import { Button } from "@/components/atoms/Button";
import { FieldError } from "@/components/atoms/FieldError";

export function RegisterForm() {
  const { email, setEmail, password, setPassword, error, isSubmitting, handleSubmit } =
    useRegisterForm();

  return (
    <AuthCard title="Crea tu cuenta">
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
          autoComplete="new-password"
          minLength={6}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <FieldError message={error} />
        <Button type="submit" isLoading={isSubmitting}>
          Crear cuenta
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="font-medium text-zinc-900 underline dark:text-zinc-50">
          Inicia sesión
        </Link>
      </p>
    </AuthCard>
  );
}
