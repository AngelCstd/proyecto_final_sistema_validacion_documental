import { http } from "@/lib/api-client";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from "@/types/auth";

export function login(payload: LoginPayload) {
  return http.post<AuthResponse>("/auth/login", payload);
}

export function register(payload: RegisterPayload) {
  return http.post<AuthResponse>("/auth/register", payload);
}

export function validateSession() {
  return http.get<User>("/auth/validate");
}

export function logout() {
  return http.post<{ success: boolean }>("/auth/logout");
}
