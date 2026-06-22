"use client";

import Link from "next/link";
import { useLoginForm } from "@/hooks/use-login-form";
import { AuthCard } from "@/components/molecules/AuthCard";
import { FormField } from "@/components/molecules/FormField";
import { Button } from "@/components/atoms/Button";
import { FieldError } from "@/components/atoms/FieldError";

export function LoginForm() {
  const { email, setEmail, password, setPassword, error, isSubmitting, handleSubmit } =
    useLoginForm();

  return (
    <AuthCard title="Inicia sesión">
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
      <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
        ¿No tienes cuenta?{" "}
        <Link href="/register" className="font-medium text-zinc-900 underline dark:text-zinc-50">
          Regístrate
        </Link>
      </p>
    </AuthCard>
  );
}
