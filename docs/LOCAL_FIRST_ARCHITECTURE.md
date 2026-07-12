# Local-First Architecture

Passei AI stores local MVP data in IndexedDB through Dexie. The stable database name is `passei-ai-local`; schema version 1 is additive and does not delete data automatically. Seeds are idempotent and backups are exported/imported transactionally.

Local browser data belongs to its exact origin. Localhost, Vercel Preview and the production domain have separate databases. Use the production domain for real daily data and export backups regularly.

## Vercel

- Root Directory: `frontend`
- Framework Preset: Vite
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

`frontend/vercel.json` rewrites every direct route to `index.html` so React Router paths continue to work after deployment.

## Backup and recovery

Use the local backup export before clearing browser data, changing browsers, or using a new origin. IndexedDB persistence can be requested but is not an absolute guarantee against browser storage eviction. A future cloud migration should import this JSON through a server-side migration, never by reading browser storage remotely.
