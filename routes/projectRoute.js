const r = require("express").Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const c = require("../controller/projectController");

r.use(auth);

r.post("/create", isAdmin, c.create);
r.get("/list", c.list);
r.put("/:id", auth, c.update);

module.exports = r;
