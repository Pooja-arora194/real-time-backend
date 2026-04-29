const r = require("express").Router();
const a = require("../middleware/auth");
const c = require("../controller/taskController");
r.use(a);
r.post("/create", c.create);
r.get("/project/:projectId", c.list);
r.put("/:id", c.update);
r.patch("/:id/status", c.status);
module.exports = r;
