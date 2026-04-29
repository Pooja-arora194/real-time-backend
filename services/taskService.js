const Task = require("../model/Task");
exports.create = (data) =>
  Task.create(data).then((t) => t.populate("assignedTo", "name email"));

exports.byProject = (projectId) =>
  Task.find({ projectId })
    .populate("assignedTo", "name email")
    .populate("projectId", "name");

exports.update = (id, data) =>
  Task.findByIdAndUpdate(id, data, { new: true })
    .populate("assignedTo", "name email")
    .populate("projectId", "name");

exports.remove = (id) => Task.findByIdAndDelete(id);
