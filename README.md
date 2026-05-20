# DEVFOLIO.AI

DevFolio AI is an intelligent portfolio builder that automatically generates stunning, ready-to-deploy developer portfolios by analyzing your GitHub profile. It intelligently scans repositories, programming languages, and GitHub stats to instantly create a highly professional showcase.

## Tech Stack

The project is structured as a modern monorepo using `pnpm` workspaces:

- **Frontend:** React, Vite, TailwindCSS (v4), Radix UI, Framer Motion
- **Backend:** Node.js 24, Express 5, TypeScript 5.9
- **Database:** PostgreSQL + Drizzle ORM
- **Validation:** Zod (`zod/v4`), `drizzle-zod`

## Workspace Packages

- `@workspace/devfolio-ai` (Frontend App)
- `@workspace/api-server` (Backend Express App)
- `@workspace/db` (Database Schemas and config)
- `@workspace/api-client-react` (Auto-generated React Query hooks)
- `@workspace/api-spec` (OpenAPI definitions and Codegen tools)
- `@workspace/api-zod` (Shared Zod schemas)

## Getting Started Locally

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Environment Setup
Create a `.env` file in the root directory and add a local PostgreSQL database connection string:
```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
```

### 3. Push Database Schema
```bash
pnpm --filter @workspace/db run push
```

### 4. Start the Application

You can start the backend API and frontend dev server in separate terminal windows.

**Backend API (Port 5001):**
```bash
# Set environment variables for Windows CMD:
set DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
set PORT=5001
set NODE_ENV=development

pnpm --filter @workspace/api-server run build
pnpm --filter @workspace/api-server run start
```
*(On Linux/Mac, you can just run `pnpm --filter @workspace/api-server run dev`)*

**Frontend Application (Port 8080):**
```bash
# Set environment variables for Windows CMD:
set PORT=8080
set BASE_PATH=/

pnpm --filter @workspace/devfolio-ai run dev
```

The frontend will be available at [http://localhost:8080](http://localhost:8080).
