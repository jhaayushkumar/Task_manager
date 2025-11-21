const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const auth = require("./middleware/auth");
dotenv.config();

const app = express();
app.use(express.json());

// CORS configuration for production
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://task-manager-eight-rose-22.vercel.app'
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Task Manager API is running',
    timestamp: new Date().toISOString()
  });
});

// Test database connection endpoint
app.get('/health', async (req, res) => {
  try {
    const prisma = require('./config/db');
    await prisma.$connect();
    const userCount = await prisma.user.count();
    res.json({ 
      status: 'healthy', 
      database: 'connected',
      users: userCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'unhealthy', 
      database: 'disconnected',
      error: error.message 
    });
  }
});

app.use("/auth", require("./routes/authRoutes"));
app.use('/users', require('./routes/userRoutes'));
app.use("/todos", auth, require("./routes/todosRoute"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
