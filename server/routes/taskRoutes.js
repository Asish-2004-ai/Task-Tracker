// server/routes/task.routes.js
const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const Project = require("../models/Project");
const authenticate = require("../middleware/authMiddleware");

// Create Task
router.post("/:projectId/tasks", authenticate, async (req, res) => {
  const { title, description, status } = req.body;
  const { projectId } = req.params;

  try {
    const project = await Project.findOne({ _id: projectId, user: req.user._id });
    if (!project) return res.status(404).json({ message: "Project not found." });

    const task = new Task({ title, description, status, project: projectId });
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating task" });
  }
});

// Get All Tasks for a Project
router.get("/:projectId/tasks", authenticate, async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// Update a Task
router.put("/:projectId/tasks/:taskId", authenticate, async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const task = await Task.findOne({ _id: req.params.taskId, project: req.params.projectId });
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;

    if (status === "Completed") task.completedAt = new Date();

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error updating task" });
  }
});

// Delete Task
router.delete("/:projectId/tasks/:taskId", authenticate, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.taskId, project: req.params.projectId });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task" });
  }
});

module.exports = router;
