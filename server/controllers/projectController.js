const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  const projectCount = await Project.countDocuments({ user: req.user._id });
  if (projectCount >= 4) return res.status(400).json({ message: "Max 4 projects allowed" });

  try {
    const project = await Project.create({
      name: req.body.name,
      user: req.user._id
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
