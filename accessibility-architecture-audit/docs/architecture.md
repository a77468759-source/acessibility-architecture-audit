# Architecture summary

## Overview

The monorepo is structured around a simple client-server split:

- `client/` holds the React frontend and Vite build pipeline.
- `server/` holds the Express API and MongoDB/Mongoose integration.
- `docs/` summarizes the audit and structural choices.
- `tests/` holds small validation checks for navigation and API behavior.

## Frontend

The React app is a single-page experience with five major content sections:

- Home
- About
- Departments
- Admissions
- Feedback

The app keeps the navigation simple and accessible, prioritizing native HTML semantics and keyboard usability. It uses a mobile menu implemented with a real button element and a clear focus state.

## Backend

The server exposes content data and accepts feedback submissions. The design keeps data fetching and business logic separated into `controllers`, `routes`, and `services`. The Mongoose model is present for future persistence, while the demo also supports local development without a database.

## Testing

The project includes lightweight tests for the UI and API layers. These checks are designed to be easy to extend without adding unnecessary complexity.
