export type RolesUser = "ADMIN" | "CAPTURISTA";

export interface User {
  id: string;
  email: string;
  rol: RolesUser;
  nombre: string;
}

export interface AuthResponse {
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}
