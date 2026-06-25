# Sistema de Validación Documental con Código QR

Plataforma para emitir documentos oficiales (PDF) con un código QR de validación. Un usuario interno sube un PDF, el sistema genera un folio único y un QR, lo inserta en el PDF, y cualquier persona (sin necesidad de cuenta) puede escanear ese QR para confirmar si el documento es auténtico, fue revocado o cancelado.

## Tecnologías utilizadas

- **Backend:** NestJS + Prisma ORM
- **Base de datos:** PostgreSQL
- **Frontend:** Next.js (React)
- **Autenticación:** JWT en cookie httpOnly, con roles (`ADMIN` / `CAPTURISTA`)
- **Generación de QR:** `qrcode`
- **Inserción del QR en el PDF:** `pdf-lib`
- **Subida de archivos:** Multer
- **Contenedores:** Docker Compose

## Requisitos

- Docker y Docker Compose instalados.

## Instalación y ejecución

1. Clonar el repositorio.
2. Desde la raíz del proyecto, ejecutar:

   ```bash
   docker compose up -d --build
   ```

3. Esperar a que los tres contenedores (`postgres`, `backend`, `frontend`) estén corriendo. Al iniciar, el backend automáticamente:
   - Genera el cliente de Prisma.
   - Aplica las migraciones (crea las tablas).
   - Ejecuta el seed (crea los usuarios de prueba).

4. Acceder a:
   - **Frontend:** http://localhost:3001
   - **Backend (API):** http://localhost:3000

## Usuarios de prueba

| Rol | Email | Password |
|---|---|---|
| Administrador | `admin@prueba.com` | `admin` |
| Capturista | `capturista@prueba.com` | `capturista` |

Diferencia entre roles: ambos pueden subir documentos y consultar el repositorio. Solo **ADMIN** puede revocar/cancelar un documento y ver el historial de validaciones/bitácora de cada documento.

## Flujo para probar el sistema

1. Inicia sesión con cualquiera de los dos usuarios.
2. Ve a **Documentos** → **Subir documento**, sube un PDF y llena los campos (título, tipo, área emisora, posición del QR).
3. Al guardar, el sistema genera el folio, el QR, y el PDF con el QR insertado.
4. Desde el repositorio puedes descargar el PDF con QR o ver el detalle del documento.
5. Copia la liga pública de validación: `http://localhost:3001/validate/{folio}` (el mismo folio que ves en la tabla) y ábrela en otra pestaña — funciona sin sesión iniciada.
6. Con el usuario **admin**, desde el detalle del documento puedes revocarlo o cancelarlo, y ver cómo cambia el resultado en la liga pública.

## Comandos útiles

```bash
docker compose down -v            # apagar todo y borrar volúmenes (DB y node_modules de los contenedores)
docker compose logs -f backend    # ver logs del backend en vivo
docker compose logs -f frontend   # ver logs del frontend en vivo
```

## Notas

- La base de datos de Postgres no usa volumen persistente: cada vez que se recrean los contenedores, se vuelve a migrar y sembrar a los usuarios de prueba desde cero.
- `node_modules` de backend y frontend no existen en el repositorio ni en el host: viven únicamente dentro de los contenedores (se generan al construir la imagen). Por eso el comando para apagar es `docker compose down -v` en vez de un `down` simple.
- Las variables de entorno (`backend/.env`) están incluidas en el repositorio para que el sistema funcione con un solo comando, sin pasos de configuración adicionales. No contienen credenciales de producción.
