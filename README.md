# Auth NestJS + Next.js + PostgreSQL (Docker Compose)

Sistema de autenticación con backend en NestJS, frontend en Next.js y base de datos PostgreSQL, todo orquestado con Docker Compose.

## Tecnologías utilizadas

- **Backend:** NestJS + Prisma ORM
- **Frontend:** Next.js (React)
- **Base de datos:** PostgreSQL
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
   - Ejecuta el seed (crea el usuario de prueba).

4. Acceder a:
   - **Frontend:** http://localhost:3001
   - **Backend (API):** http://localhost:3000

## Usuario de prueba

| Email | Password |
|---|---|
| `prueba@fesaragon.com` | `holahola` |

## Comandos útiles

```bash
docker compose down        # apagar todo (los datos de Postgres no persisten entre reinicios)
docker compose logs -f backend   # ver logs del backend en vivo
docker compose logs -f frontend  # ver logs del frontend en vivo
```

## Notas

- La base de datos de Postgres no usa volumen persistente: cada vez que se recrean los contenedores, se vuelve a migrar y sembrar el usuario de prueba desde cero.
- Las variables de entorno (`backend/.env`, `frontend/.env.local`) están incluidas en el repositorio para que el sistema funcione con un solo comando, sin pasos de configuración adicionales. No contienen credenciales de producción.
