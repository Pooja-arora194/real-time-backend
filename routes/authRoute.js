const router = require("express").Router();
const auth = require("../middleware/auth");
const c = require("../controller/authController");
router.post("/register", c.register);
router.post("/login", c.login);
router.get("/me", auth, c.getMe);
router.get("/users", auth, c.getUsers);
module.exports = router;
