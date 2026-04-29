const jwt = require("jsonwebtoken");

module.exports = (io) => {
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        return next(new Error("No token provided"));
      }

      const user = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = user;

      next();
    } catch (err) {
      next(new Error("Unauthorized"));
    }
  });
  io.on("connection", (socket) => {
    console.log("CONNECTED:", socket.id);

    socket.on("joinProject", (projectId) => {
      const room = `project_${projectId}`;
      socket.join(room);

      console.log("JOINED:", room);
    });
  });
};
