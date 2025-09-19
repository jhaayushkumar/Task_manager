const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const auth = require("./middleware/auth");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 3000;

app.use("/auth", require("./routes/authRoutes"));
app.use('/users', require('./routes/userRoutes'));
app.use("/todos", auth, require("./routes/todosRoute"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
