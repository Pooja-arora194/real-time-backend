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
const allowedOrigins = [
  "http://localhost:3000",
  "https://your-frontend.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));

app.options("*", cors());
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


server.listen(process.env.PORT, () =>
  console.log("Server running on " + process.env.PORT),
);
