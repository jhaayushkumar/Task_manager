# Deployment Guide

## Frontend (Vite + React)

1. Configure API base URL

Create `frontend/.env.production` with:

VITE_API_BASE=https://your-backend-domain.com

2. Build

npm ci
npm run build

3. Deploy

Upload `frontend/dist/` to your static host (Vercel/Netlify/Nginx/S3+CloudFront).

## Backend (Express + Prisma)

1. Environment variables

- PORT=3000
- DATABASE_URL=your-prisma-connection-string
- JWT_SECRET=your-strong-secret
- SMTP settings if email notifications are enabled
- OPENAI_API_KEY if AI utilities are used

2. Install & migrate

npm ci
npx prisma migrate deploy

3. Start

npm start

4. CORS

Ensure CORS allows your frontend origin.
