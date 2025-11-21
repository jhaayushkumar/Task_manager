# 🔧 Supabase Connection Fix

## Issue
Backend cannot connect to Supabase database from Render.

## Possible Causes:
1. Supabase database is paused (free tier auto-pauses after inactivity)
2. Need connection pooling for production
3. SSL configuration issue

## Solution 1: Check Supabase Dashboard

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Check if database is **paused** (will show "Paused" status)
4. If paused, click **"Resume"** or **"Restore"**
5. Wait 1-2 minutes for database to wake up

## Solution 2: Use Connection Pooling URL

Supabase provides 2 types of URLs:
- **Direct Connection** (for migrations): Port 5432
- **Connection Pooler** (for production): Port 6543

### Update DATABASE_URL on Render to use pooler:

**Current (Direct):**
```
postgresql://postgres:koWNnq9D7JcT0YC1@db.ukthcmpectkdljdlphbc.supabase.co:5432/postgres?sslmode=require
```

**Try Pooler (Change port to 6543):**
```
postgresql://postgres:koWNnq9D7JcT0YC1@db.ukthcmpectkdljdlphbc.supabase.co:6543/postgres?sslmode=require&pgbouncer=true
```

## Solution 3: Get Fresh Connection String from Supabase

1. Go to Supabase Dashboard
2. Project Settings → Database
3. Copy **Connection Pooling** URL (Transaction mode)
4. Replace password placeholder with: `koWNnq9D7JcT0YC1`
5. Add `?sslmode=require` at the end
6. Update on Render

## After Updating:

1. Save changes on Render
2. Wait for redeploy (2-3 minutes)
3. Test again

---

**Which solution to try first?**
→ Check if Supabase database is paused (Solution 1)
