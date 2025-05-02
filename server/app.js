// server/app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000',  // frontend URL
  credentials: true                 // allow cookies/auth tokens
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/projects", taskRoutes);
app.get('/api/test', (req, res) => {
  res.send('Hello from backend!');
});


// Connect DB and Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
