const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type Query = Record<string, string | number | boolean>;

async function parseJsonResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message ?? "Algo salió mal, intenta de nuevo.";
    throw new ApiError(
      Array.isArray(message) ? message[0] : message,
      response.status,
    );
  }

  return data as T;
}

async function request<T>(
  method: "GET" | "POST" | "PATCH" | "DELETE",
  path: string,
  { body, query }: { body?: unknown; query?: Query } = {},
): Promise<T> {
  const url = query
    ? `${API_URL}${path}?${new URLSearchParams(query as Record<string, string>).toString()}`
    : `${API_URL}${path}`;

  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  return parseJsonResponse<T>(response);
}

// Para subir archivos (multipart/form-data). A propósito NO se manda
// Content-Type: el navegador lo pone solo, con el boundary correcto —
// si lo seteamos a mano, el backend no puede parsear el body.
async function requestForm<T>(path: string, formData: FormData): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  return parseJsonResponse<T>(response);
}

// Para descargar archivos binarios (PDFs). La respuesta no es JSON,
// así que no pasa por parseJsonResponse.
async function requestBlob(path: string): Promise<Blob> {
  const response = await fetch(`${API_URL}${path}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const message = data?.message ?? "No se pudo descargar el archivo.";
    throw new ApiError(
      Array.isArray(message) ? message[0] : message,
      response.status,
    );
  }

  return response.blob();
}

export const http = {
  get: <T>(path: string, query?: Query) => request<T>("GET", path, { query }),
  post: <T>(path: string, body?: unknown) => request<T>("POST", path, { body }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>("PATCH", path, { body }),
  delete: <T>(path: string) => request<T>("DELETE", path),
  postForm: <T>(path: string, formData: FormData) =>
    requestForm<T>(path, formData),
  getBlob: (path: string) => requestBlob(path),
};
