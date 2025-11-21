const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function setupDatabase() {
  try {
    console.log('🚀 Setting up Supabase database...\n');
    
    // Check connection
    await prisma.$connect();
    console.log('✓ Connected to Supabase');
    
    // Create User table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" SERIAL NOT NULL,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "User_pkey" PRIMARY KEY ("id")
      );
    `);
    console.log('✓ User table created');
    
    // Create unique index on email
    await prisma.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
    `);
    console.log('✓ User email index created');
    
    // Create Todo table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Todo" (
        "id" SERIAL NOT NULL,
        "title" TEXT NOT NULL,
        "description" TEXT,
        "todotype" TEXT DEFAULT 'general',
        "priority" INTEGER,
        "dueDate" TIMESTAMP(3),
        "completed" BOOLEAN NOT NULL DEFAULT false,
        "userId" INTEGER NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
      );
    `);
    console.log('✓ Todo table created');
    
    // Add foreign key
    await prisma.$executeRawUnsafe(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'Todo_userId_fkey'
        ) THEN
          ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userId_fkey" 
          FOREIGN KEY ("userId") REFERENCES "User"("id") 
          ON DELETE RESTRICT ON UPDATE CASCADE;
        END IF;
      END $$;
    `);
    console.log('✓ Todo foreign key created');
    
    // Verify tables
    const userCount = await prisma.user.count();
    const todoCount = await prisma.todo.count();
    
    console.log('\n✅ Database setup complete!');
    console.log(`   Users: ${userCount}`);
    console.log(`   Todos: ${todoCount}`);
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase();
