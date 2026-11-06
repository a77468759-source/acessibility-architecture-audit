# Accessibility Architecture Audit

This monorepo contains a simple educational web application built to demonstrate accessible design patterns and a clean frontend/backend separation. The project follows a beginner-friendly architecture and keeps the implementation small enough to understand quickly.

## Stack

- Frontend: React + Vite + JavaScript + Tailwind CSS
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose (with graceful fallback when no local database is configured)
- Testing: Vitest + React Testing Library + Supertest

## Workspace structure

- `client/` — React frontend
- `server/` — Express API
- `docs/` — audit and architecture notes
- `tests/` — integration and accessibility checks

## Quick start

```bash
npm install
npm run dev
```

The client runs on `http://localhost:5173` and the API on `http://localhost:5000`.

## Scripts

```bash
npm run dev
npm run build
npm run test
npm run test:server
```

## Notes

- The app deliberately avoids copying the original audited site and instead creates original educational content.
- Accessibility features are implemented with native HTML, visible focus management, keyboard support, and strong color contrast.
- The backend includes a lightweight content API and a feedback submission route.
