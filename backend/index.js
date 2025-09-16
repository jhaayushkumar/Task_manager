const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const auth = require("./middleware/auth");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use('/users', require('./routes/userRoutes'));
app.use("/todos", auth, require("./routes/todosRoute"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
