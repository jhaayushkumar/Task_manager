# 🚀 Deployment Guide

## Live URLs
- **Frontend**: https://task-manager-eight-rose-22.vercel.app
- **Backend**: https://task-manager-1-tgjv.onrender.com

---

## 📋 Backend Deployment (Render)

### Environment Variables to Set on Render:

Go to your Render dashboard → Your service → Environment → Add the following:

```
DATABASE_URL=postgresql://postgres:koWNnq9D7JcT0YC1@db.ukthcmpectkdljdlphbc.supabase.co:5432/postgres
PORT=3000
EMAIL_USER=jha44481@gmail.com
EMAIL_PASS=ugzb huew uhpf fkbu
JWT_SECRET=bb314fdb9af16fb9d7c39b682fb3eb32
```

### Build Command:
```bash
npm install && npx prisma generate
```

### Start Command:
```bash
npm start
```

---

## 🎨 Frontend Deployment (Vercel)

### Environment Variables to Set on Vercel:

Go to your Vercel dashboard → Your project → Settings → Environment Variables:

```
VITE_API_BASE=https://task-manager-1-tgjv.onrender.com
```

### Build Command:
```bash
npm run build
```

### Output Directory:
```
dist
```

---

## ✅ Post-Deployment Checklist

1. ✓ Set all environment variables on Render
2. ✓ Set VITE_API_BASE on Vercel
3. ✓ Redeploy backend on Render after setting env vars
4. ✓ Redeploy frontend on Vercel after setting env vars
5. ✓ Run database setup (if needed): `node backend/setup-supabase.js`
6. ✓ Test the live application

---

## 🧪 Testing Production

Run the test script:
```bash
node test-production.js
```

---

## 🔧 Important Notes

- **CORS**: Backend is configured to accept requests from the Vercel frontend URL
- **Database**: Using Supabase PostgreSQL (already set up with tables)
- **Authentication**: JWT-based with 7-day expiry
- **Email**: Configured with Gmail SMTP

---

## 📝 Next Steps

1. Go to Render dashboard and add all environment variables
2. Trigger a manual deploy on Render
3. Go to Vercel dashboard and add VITE_API_BASE
4. Trigger a redeploy on Vercel
5. Test the application using the test script

---

## 🆘 Troubleshooting

### Backend not connecting to database:
- Check if DATABASE_URL is set correctly on Render
- Verify Supabase database is accessible
- Check Render logs for errors

### Frontend not connecting to backend:
- Verify VITE_API_BASE is set on Vercel
- Check if backend URL is correct
- Verify CORS settings in backend/index.js

### CORS errors:
- Make sure frontend URL is added to CORS origins in backend/index.js
- Redeploy backend after updating CORS settings
