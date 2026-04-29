const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (data) => {
  const hash = await bcrypt.hash(data.password, 10);
  return await User.create({ ...data, password: hash });
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error("Invalid credentials");

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role, // ✅ add role here
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  return {
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
exports.getUserById = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
exports.getAllUsers = async () => {
  const users = await User.find({ role: { $ne: "admin" } }).select("-password");

  return users;
};
