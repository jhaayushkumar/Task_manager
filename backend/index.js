const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const auth = require("./middleware/auth");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:3000',
    'https://task-manager-eight-rose-22.vercel.app'
  ],
  credentials: true
}));


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
