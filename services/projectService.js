const Project = require("../model/project");

exports.create = (data) => Project.create(data);
exports.list = () => Project.find().populate("members");
exports.update = (id, data) =>
  Project.findByIdAndUpdate(id, data, { new: true });
exports.remove = (id) => Project.findByIdAndDelete(id);
