const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('Testing database connection...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set ✓' : 'Not set ✗');
    
    // Test connection
    await prisma.$connect();
    console.log('✓ Database connected successfully!');
    
    // Test query
    const userCount = await prisma.user.count();
    console.log(`✓ Found ${userCount} users in database`);
    
    const todoCount = await prisma.todo.count();
    console.log(`✓ Found ${todoCount} todos in database`);
    
    console.log('\n✓ All database checks passed!');
  } catch (error) {
    console.error('✗ Database connection failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
