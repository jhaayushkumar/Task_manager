const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const auth = require("./middleware/auth");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy for deployments behind a proxy (Heroku/Render/Nginx)
app.set('trust proxy', 1);

// CORS: allow configured origins, fallback to permissive in dev
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((s) => s.trim())
  : true; // true == reflect request origin (dev)
app.use(cors({ origin: allowedOrigins }));

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use('/users', require('./routes/userRoutes'));
app.use("/todos", auth, require("./routes/todosRoute"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
