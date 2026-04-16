# timely-socials

Unified Timely Socials app with:

- Next.js frontend in `src/app`
- Express API in `src/server.ts`

## Scripts

- `npm run dev:web` starts the Next.js frontend
- `npm run dev:api` starts the Express API
- `npm run build:web` builds the frontend
- `npm run build:api` builds the backend into `dest/`

## Backend deployment

The backend is prepared for Render deployment:

- build command: `npm run build:api`
- start command: `npm run start:api`
- healthcheck path: `/health`
- blueprint file: `render.yaml`

Copy `.env.example` into Render environment variables and set real values before deploying.
