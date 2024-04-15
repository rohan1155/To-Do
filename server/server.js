const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());
const connectDB = require("./config/database");
const userRoutes = require("./routes/User");
const todoRoutes = require("./routes/Todo");
const verifyToken = require("./config/verifyToken");
app.get("/", (req, res) => {
  res.send("Hello World!");
});
connectDB();

app.use("/user", userRoutes);
app.use("/api", verifyToken, todoRoutes);

app.listen(process.env.PORT, () => {
  console.log("app listening on port " + process.env.PORT);
});
