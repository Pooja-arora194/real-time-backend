const s = require("../services/taskService");
exports.create = async (req, res, next) => {
  try {
    res.json(await s.create(req.body));
  } catch (e) {
    next(e);
  }
};
exports.list = async (req, res, next) => {
  try {
    res.json(await s.byProject(req.params.projectId));
  } catch (e) {
    next(e);
  }
};
exports.update = async (req, res, next) => {
  try {
    res.json(await s.update(req.params.id, req.body));
  } catch (e) {
    next(e);
  }
};
exports.remove = async (req, res, next) => {
  try {
    await s.remove(req.params.id);
    res.json({ message: "Deleted" });
  } catch (e) {
    next(e);
  }
};

exports.status = async (req, res, next) => {
  try {
    const task = await s.update(req.params.id, {
      status: req.body.status,
    });

    const io = req.app.get("io");

    const projectId =
      task.projectId?._id?.toString?.() || task.projectId.toString();

    const room = `project_${projectId}`;

    console.log("EMITTING TO:", room);

    io.to(room).emit("taskUpdated", task);

    res.json(task);
  } catch (e) {
    next(e);
  }
};
