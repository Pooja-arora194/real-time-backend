const service = require("../services/authService");
exports.register = async (req, res, next) => {
  try {
    const user = await service.register(req.body);
    res.json(user);
  } catch (e) {
    next(e);
  }
};
exports.login = async (req, res, next) => {
  console.log(
    req.body.email,
    req.body.password,
    "req.body.email, req.body.password",
  );
  try {
    const data = await service.login(req.body.email, req.body.password);
    res.json(data);
  } catch (e) {
    next(e);
  }
};
exports.getMe = async (req, res) => {
  try {
    const user = await service.getUserById(req.user.id);

    res.json(user);
  } catch (err) {
    console.log("GET ME ERROR 👉", err.message);

    res.status(500).json({
      message: err.message,
    });
  }
};
exports.getUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await service.getAllUsers();

    res.json(users);
  } catch (err) {
    console.log("GET USERS ERROR 👉", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
