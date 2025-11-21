const { Client } = require('pg');

const connectionString = 'postgresql://postgres:koWNnq9D7JcT0YC1@db.ukthcmpectkdljdlphbc.supabase.co:5432/postgres';

async function testSupabase() {
  console.log('🔍 Testing Supabase Connection...\n');
  
  const client = new Client({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('Connecting to Supabase...');
    await client.connect();
    console.log('✓ Connected successfully!\n');

    // Test query
    const result = await client.query('SELECT NOW()');
    console.log('✓ Query successful!');
    console.log('Server time:', result.rows[0].now);

    // Check if tables exist
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('\n📋 Tables in database:');
    if (tables.rows.length === 0) {
      console.log('   ⚠️  No tables found! Database needs setup.');
    } else {
      tables.rows.forEach(row => {
        console.log('   -', row.table_name);
      });
    }

  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('\nPossible issues:');
    console.error('1. Database password might be wrong');
    console.error('2. Database might be paused/deleted');
    console.error('3. IP might be blocked');
    console.error('4. SSL configuration issue');
  } finally {
    await client.end();
  }
}

testSupabase();
