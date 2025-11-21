const axios = require('axios');
require('dotenv').config();

const API_URL = `http://localhost:${process.env.PORT || 3000}`;

async function testFullStack() {
  console.log('🧪 Testing Full Stack Application\n');
  
  try {
    // Test 1: Server Health
    console.log('1️⃣  Testing server health...');
    try {
      await axios.get(API_URL);
      console.log('   ✓ Server is running');
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        console.log('   ✗ Server is not running');
        console.log('   💡 Start server with: npm start or npm run dev');
        return;
      }
    }
    
    // Test 2: Register new user
    console.log('\n2️⃣  Testing user registration...');
    const testUser = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'Test@123'
    };
    
    const registerRes = await axios.post(`${API_URL}/auth/register`, testUser);
    console.log('   ✓ User registered successfully');
    console.log('   User ID:', registerRes.data.user?.id);
    
    // Test 3: Login
    console.log('\n3️⃣  Testing user login...');
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    const token = loginRes.data.token;
    console.log('   ✓ Login successful');
    console.log('   Token received:', token ? 'Yes' : 'No');
    
    // Test 4: Create Todo
    console.log('\n4️⃣  Testing todo creation...');
    const todoRes = await axios.post(
      `${API_URL}/todos`,
      {
        title: 'Test Todo',
        description: 'Testing todo creation',
        todotype: 'work',
        priority: 1,
        completed: false
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    console.log('   ✓ Todo created successfully');
    console.log('   Todo ID:', todoRes.data.id);
    
    // Test 5: Get Todos
    console.log('\n5️⃣  Testing get todos...');
    const todosRes = await axios.get(`${API_URL}/todos`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('   ✓ Todos fetched successfully');
    console.log('   Total todos:', todosRes.data.length);
    
    // Test 6: Get User Profile
    console.log('\n6️⃣  Testing get user profile...');
    const profileRes = await axios.get(`${API_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('   ✓ Profile fetched successfully');
    console.log('   User:', profileRes.data.name);
    
    console.log('\n✅ All tests passed! Application is ready for deployment.');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.response?.data || error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
  }
}

testFullStack();
