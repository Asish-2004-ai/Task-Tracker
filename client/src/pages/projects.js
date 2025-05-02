import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText
} from "@mui/material";

function Projects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("/projects", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>My Projects</Typography>
      {projects.length === 0 ? (
        <Typography>No projects found.</Typography>
      ) : (
        <List>
          {projects.map((project) => (
            <Paper key={project._id} sx={{ my: 2, p: 2 }}>
              <ListItem
                button
                onClick={() => navigate(`/projects/${project._id}/tasks`)}
              >
                <ListItemText primary={project.name} />
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
      <Button variant="contained" onClick={() => navigate("/create-project")}>
        Create New Project
      </Button>
    </Box>
  );
}

export default Projects;
