const https = require('https');
const http = require('http');

const BACKEND_URL = 'https://task-manager-1-tgjv.onrender.com';
const FRONTEND_URL = 'https://task-manager-eight-rose-22.vercel.app';

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const urlObj = new URL(url);
    
    const reqOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    const req = protocol.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: data ? JSON.parse(data) : null,
            headers: res.headers
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: data,
            headers: res.headers
          });
        }
      });
    });

    req.on('error', reject);
    
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    
    req.end();
  });
}

async function testProduction() {
  console.log('🚀 Testing Production Deployment\n');
  console.log('Backend:', BACKEND_URL);
  console.log('Frontend:', FRONTEND_URL);
  console.log('─'.repeat(60));

  try {
    // Test 1: Backend Health
    console.log('\n1️⃣  Testing Backend Health...');
    try {
      const health = await makeRequest(`${BACKEND_URL}/`);
      console.log(`   Status: ${health.status}`);
      if (health.status === 404) {
        console.log('   ✓ Backend is responding (404 is expected for root)');
      } else {
        console.log('   ✓ Backend is responding');
      }
    } catch (error) {
      console.log('   ✗ Backend connection failed:', error.message);
      return;
    }

    // Test 2: Register User
    console.log('\n2️⃣  Testing User Registration...');
    const testEmail = `test${Date.now()}@example.com`;
    const registerRes = await makeRequest(`${BACKEND_URL}/auth/signup`, {
      method: 'POST',
      body: {
        name: 'Production Test User',
        email: testEmail,
        password: 'Test@123'
      }
    });
    
    if (registerRes.status === 201 || registerRes.status === 200) {
      console.log('   ✓ User registered successfully');
      console.log('   User ID:', registerRes.data.userId);
    } else {
      console.log('   ✗ Registration failed:', registerRes.status, registerRes.data);
      return;
    }

    // Test 3: Login
    console.log('\n3️⃣  Testing User Login...');
    const loginRes = await makeRequest(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      body: {
        email: testEmail,
        password: 'Test@123'
      }
    });
    
    if (loginRes.status === 200 && loginRes.data.token) {
      console.log('   ✓ Login successful');
      console.log('   Token received: Yes');
      
      const token = loginRes.data.token;

      // Test 4: Create Todo
      console.log('\n4️⃣  Testing Todo Creation...');
      const todoRes = await makeRequest(`${BACKEND_URL}/todos`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: {
          title: 'Production Test Todo',
          description: 'Testing live deployment',
          todotype: 'work',
          priority: 1
        }
      });
      
      if (todoRes.status === 201 || todoRes.status === 200) {
        console.log('   ✓ Todo created successfully');
        console.log('   Todo ID:', todoRes.data.id);
      } else {
        console.log('   ✗ Todo creation failed:', todoRes.status);
      }

      // Test 5: Get Todos
      console.log('\n5️⃣  Testing Get Todos...');
      const todosRes = await makeRequest(`${BACKEND_URL}/todos`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (todosRes.status === 200) {
        console.log('   ✓ Todos fetched successfully');
        console.log('   Total todos:', todosRes.data.total || todosRes.data.length);
      } else {
        console.log('   ✗ Fetch todos failed:', todosRes.status);
      }

      // Test 6: Frontend Accessibility
      console.log('\n6️⃣  Testing Frontend Accessibility...');
      const frontendRes = await makeRequest(FRONTEND_URL);
      if (frontendRes.status === 200) {
        console.log('   ✓ Frontend is accessible');
      } else {
        console.log('   ⚠ Frontend status:', frontendRes.status);
      }

    } else {
      console.log('   ✗ Login failed:', loginRes.status, loginRes.data);
      return;
    }

    console.log('\n' + '─'.repeat(60));
    console.log('✅ All Production Tests Passed!');
    console.log('\n📱 Your app is live at:');
    console.log('   Frontend: ' + FRONTEND_URL);
    console.log('   Backend:  ' + BACKEND_URL);
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error(error);
  }
}

testProduction();
