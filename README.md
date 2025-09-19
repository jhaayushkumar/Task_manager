# Personal Task Manager

Plan smarter, do faster. A full‑stack Todo app with authentication, priorities, search, and a modern UI.

- Frontend: React + Vite + TailwindCSS (deployed on Vercel)
- Backend: Node.js + Express + Prisma (deployed on Render)
- Database: Prisma ORM (see prisma/schema.prisma)

## Live URLs

- Frontend (Vercel): https://personal-task-manager-iota.vercel.app
- Backend (Render): https://personal-task-manager-acbx.onrender.com

## Tech Stack

- Frontend: React, Vite, TailwindCSS, Framer Motion, React Icons, react-toastify
- Backend: Express, Prisma, bcrypt, jsonwebtoken, CORS
- Tooling: ESLint, PostCSS, Vite

## Monorepo Structure

```
/Personal-Task--Manager
  ├── backend/
  │   ├── index.js                 # Express app entry
  │   ├── controllers/             # Route controllers (auth, todos, users)
  │   ├── routes/                  # Express routes (mounted in index.js)
  │   ├── middleware/              # JWT auth middleware
  │   ├── config/                  # DB client
  │   ├── prisma/                  # Prisma schema, migrations, seed
  │   └── utils/                   # Helpers (e.g., email)
  └── frontend/
      ├── src/
      │   ├── pages/               # Pages (Login, Signup, Todos, Profile, Contact)
      │   ├── components/          # UI components + shared widgets
      │   ├── services/            # Axios client + API services
      │   ├── context/             # Auth & Theme providers
      │   └── main.jsx / App.jsx   # App bootstrapping & routes
      ├── index.html               # SEO/meta and root HTML
      └── public/                  # Static assets (served by Vite)
```

## Prerequisites

- Node.js >= 18
- npm >= 9
- A PostgreSQL (or your chosen DB that Prisma supports) instance if you want to run backend with a real DB

## Environment Variables

Set these before running locally or deploying.

Backend (`backend/.env`):

```
PORT=3000
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB_NAME?schema=public
JWT_SECRET=your-long-secret
```

Frontend (`frontend/.env`):

```
VITE_API_BASE=https://personal-task-manager-acbx.onrender.com
# For local backend use: VITE_API_BASE=http://localhost:3000
```

## Local Development Setup

### 1) Backend

```
cd backend
npm install
# Initialize database
npx prisma migrate dev --name init
# Optional: seed data
node prisma/seed.js
# Run server
npm start
# Server runs at http://localhost:3000
```

### 2) Frontend

```
cd frontend
npm install
# Ensure frontend/.env has VITE_API_BASE
npm run dev
# Vite dev server on http://localhost:5173 (default)
```

Login/Signup in the UI to get a JWT, then create todos. Protected routes (e.g., /todos) use the JWT in Authorization headers (handled automatically by axios interceptor).

## Build & Production

Frontend build:

```
cd frontend
npm run build
# Output in dist/
```

Backend is a Node server. Ensure `backend/.env` is configured and Prisma has migrated your DB.

## Deployment

- Frontend (Vercel)
  - Framework: Vite
  - Build command: `npm run build`
  - Output directory: `dist`
  - Env: `VITE_API_BASE=https://personal-task-manager-acbx.onrender.com`

- Backend (Render)
  - Environment: Node
  - Build command: `npm install && npx prisma migrate deploy`
  - Start command: `node index.js`
  - Env: `DATABASE_URL`, `JWT_SECRET`, `PORT`

CORS is enabled at the backend (`app.use(cors())`).

## API Overview (Backend)

Base URL: `https://personal-task-manager-acbx.onrender.com`

- Auth
  - POST `/auth/signup` → { name, email, password } → { message, userId }
  - POST `/auth/login` → { email, password } → { token }
- Todos (require Bearer token)
  - GET `/todos?search=...` → { total, todos }
  - POST `/todos` → { title, description?, todotype, priority, dueDate?, userId, userEmail } → todo
  - PUT `/todos/:id` → update fields
  - DELETE `/todos/:id`
- Users
  - GET `/users/:id` → user
  - PUT `/users/:id` → update user

## Contributing

1. Fork the repo and create your feature branch:
   - `git checkout -b feat/your-feature`
2. Make your changes with clear commit messages.
3. Run lint/build locally:
   - Frontend: `cd frontend && npm run build`
   - Backend: ensure `node index.js` runs after `npm install`
4. Open a Pull Request with a clear description, screenshots if UI changes.

### Code Style

- Frontend: React with functional components, keep components small and composable.
- Use meaningful names, avoid single-letter variables.
- Handle errors gracefully; never swallow exceptions silently.
- Keep formatting consistent; avoid unrelated reformatting in edits.

## Scripts

Frontend:

- `npm run dev` – Start Vite dev server
- `npm run build` – Production build

Backend:

- `npm start` – Start Express server
- `npx prisma migrate dev` – Apply local migrations
- `npx prisma studio` – Visual DB browser

## Troubleshooting

- 401 on /todos: Ensure you’re logged in and the token exists in localStorage; reload the page.
- 500 on create todo: Backend must be on the latest code; redeploy Render and retry.
- CORS errors: Confirm backend URL uses HTTPS and CORS middleware is active.
- Env not picked up on Vercel: Set `VITE_API_BASE` for both Preview and Production and redeploy.

## License

This project is provided as-is under the MIT License. See `LICENSE` (add one if needed).


