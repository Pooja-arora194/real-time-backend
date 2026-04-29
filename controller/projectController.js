const s = require("../services/projectService");
exports.create = async (req, res, next) => {
  console.log(req.body, "kykrtytrtrk");
  try {
    res.json(await s.create(req.body));
  } catch (e) {
    next(e);
  }
};
exports.list = async (req, res, next) => {
  try {
    res.json(await s.list());
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
