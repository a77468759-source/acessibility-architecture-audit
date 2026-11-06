# Server

This server exposes a small Express API for the educational website.

## Scripts

```bash
npm run dev
npm run start
npm run test
```

## Environment

Copy `.env.example` to `.env` and update the database URL if you want to store feedback in MongoDB.

## API

- `GET /api/content` — returns departments and admissions details
- `POST /api/feedback` — stores a feedback submission
- `GET /health` — health-check endpoint
