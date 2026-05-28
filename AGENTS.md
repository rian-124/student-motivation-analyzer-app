<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Student Motivation Analyzer App — AGENTS.md

## Tech stack

- **Next.js 16.2.1** (see notice above), **React 19.2.4**
- **Tailwind CSS 4** via `@tailwindcss/postcss`, **shadcn/ui** (radix-nova style)
- **Biome** for formatting/linting (`biome.json` — double quotes, trailing commas, semicolons, 80 width)
- **ESLint** (via `eslint-config-next`) for Next.js-specific rules
- **Zustand** for client state (`auth.store.ts`), **axios** for HTTP
- **Sonner** for toast notifications, **recharts** for charts, **lucide-react** for icons

## Commands

| Command | Notes |
|---|---|
| `npm run dev` | `next dev`, port 3000 |
| `npm run build` | `next build` |
| `npm run start` | `next start` |
| `npm run lint` | `next lint` (ESLint) |
| `npm run format` | `biome format --write .` (use this, NOT prettier) |
| `npm run check` | `biome check --write .` (lint + format) |
| `npx lint-staged` | runs on pre-commit hook via husky |

**Pre-commit hook**: runs `lint-staged` → `biome check --write --no-errors-on-unmatched` on staged `*.{js,ts,jsx,tsx}`.

## Architecture

- **`src/app/`** — Next.js App Router with route groups: `(auth)`, `(main)` (protected), `(public)`
- **`src/features/`** — Feature modules: `auth/`, `dashboard/`, `upload-recording/`, `analysis-result/`, `analysis-results/`, `leaderboard/`, `manage-student/`, `manage-lecture/`, `landing-page/`
- **`src/services/`** — Thin API wrappers using `@/lib/axios` instance
- **`src/store/`** — Zustand store (`auth.store.ts` only)
- **`src/context/`** — React context (`AuthContext.tsx`)
- **`src/lib/`** — `axios.ts` (configured instance), `types/`, `utils.ts`
- **`src/components/`** — Shared: `ui/` (shadcn), `common/`, `layout/`, `profile/`
- **`src/hooks/`** — Custom hooks

## Axios instance

- `@/lib/axios` creates preconfigured instance with `baseURL` from `NEXT_PUBLIC_API_URL` (default `http://localhost:3001/api`)
- Request interceptor injects `Bearer` token from `useAuthStore`
- Response interceptor handles 401 with automatic refresh token queue (prevents race conditions)
- On refresh failure, clears auth and redirects to `/login`

## Conventions

- **Path aliases**: `@/*` → `./src/*` (tsconfig paths), `@/components/ui/*` for shadcn
- **API responses** are unwrapped from `WebResponse<T>` wrapper (`{ success, statusCode, message, data, meta? }`)
- **All API calls** go through `@/lib/axios`, never raw fetch
- **Biome** rules: double quotes, trailing commas, semicolons, arrow parens always, indent 2 spaces, line width 80
- **shadcn** components in `src/components/ui/`, configured via `components.json`

## API endpoints used by app

| Method | App endpoint | Service in `src/services/` |
|---|---|---|
| POST | `/auth/login` | `auth.service.ts` |
| POST | `/auth/logout` | `auth.service.ts` |
| POST | `/auth/refresh` | `auth.service.ts` (auto-handled by interceptor) |
| GET | `/auth/profile` | `auth.service.ts` |
| POST | `/analysis/upload` | `motivation-analysis.service.ts` |
| GET | `/analysis/:id` | `motivation-analysis.service.ts` |
| GET | `/analysis/student/:studentId` | `motivation-analysis.service.ts` |
| GET | `/analysis/class/:classId` | `motivation-analysis.service.ts` |
| GET | `/analysis/graph/student/:studentId` | `motivation-analysis.service.ts` |
| GET | `/analysis` | `motivation-analysis.service.ts` |
| CRUD | `/users/*`, `/students/*`, `/lecturers/*`, `/classes/*`, `/programs/*` | respective `.service.ts` files |

## Env

Copy `.env.example` → `.env`. Single variable: `NEXT_PUBLIC_API_URL=http://localhost:3001/api`.
