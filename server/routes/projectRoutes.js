const express = require("express");
const router = express.Router();
const { createProject, getUserProjects } = require("../controllers/projectController");
const protect = require("../middleware/authMiddleware");
const Project = require("../models/Project");
const authenticate = require("../middleware/authMiddleware");


router.post("/", protect, createProject);
router.get("/", protect, getUserProjects);

// Create Project
router.post("/", authenticate, async (req, res) => {
    try {
      const userId = req.user._id;
  
      // Check if user already has 4 projects
      const projectCount = await Project.countDocuments({ user: userId });
      if (projectCount >= 4) {
        return res.status(400).json({ message: "You can only have up to 4 projects." });
      }
  
      const project = new Project({
        user: userId,
        name: req.body.name,
      });
  
      await project.save();
      res.status(201).json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Get All Projects for the logged-in user
  router.get("/", authenticate, async (req, res) => {
    try {
      const userId = req.user._id;
      const projects = await Project.find({ user: userId });
      res.json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;
