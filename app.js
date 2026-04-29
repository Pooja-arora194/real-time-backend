require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const socketInit = require("./socket");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});
app.set("io", io);
connectDB();
socketInit(io);
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});
// ✅ SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("CONNECTED:", socket.user?.id);

  // 📦 JOIN PROJECT ROOM
  socket.on("joinProject", (projectId) => {
    const room = `project_${projectId}`;
    socket.join(room);

    console.log(`USER JOINED ROOM: ${room}`);
  });

  socket.on("disconnect", () => {
    console.log("DISCONNECTED:", socket.id);
  });
});

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/projects", require("./routes/projectRoute"));
app.use("/api/tasks", require("./routes/taskRoute"));
app.use(errorHandler); 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

