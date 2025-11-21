require('dotenv').config();
const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL;

async function setupDatabase() {
  const client = new Client({ connectionString });
  
  try {
    console.log('🔌 Connecting to Supabase...');
    await client.connect();
    console.log('✅ Connected!\n');

    console.log('📋 Creating tables...');
    
    // Create User table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "User" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(191) NOT NULL,
        email VARCHAR(191) UNIQUE NOT NULL,
        password VARCHAR(191) NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ User table created');

    // Create Todo table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Todo" (
        id SERIAL PRIMARY KEY,
        title VARCHAR(191) NOT NULL,
        description TEXT,
        todotype VARCHAR(191) DEFAULT 'general',
        priority INTEGER,
        "dueDate" TIMESTAMP(3),
        completed BOOLEAN NOT NULL DEFAULT false,
        "userId" INTEGER NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE RESTRICT ON UPDATE CASCADE
      );
    `);
    console.log('✅ Todo table created');

    // Create index
    await client.query(`
      CREATE INDEX IF NOT EXISTS "Todo_userId_idx" ON "Todo"("userId");
    `);
    console.log('✅ Index created\n');

    // Test query
    const result = await client.query('SELECT COUNT(*) FROM "User"');
    console.log('📊 Current users:', result.rows[0].count);

    console.log('\n🎉 Database setup complete!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

setupDatabase();
