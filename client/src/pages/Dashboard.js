// client/src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  Stack
} from "@mui/material";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const response = await axios.get("/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(response.data);
      } catch (err) {
        console.error("Error fetching projects", err);
      }
    };

    fetchProjects();
  }, [navigate]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Projects
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/create-project")}
        sx={{ mb: 3 }}
      >
        Create Project
      </Button>

      {projects.length > 0 ? (
        <Stack spacing={2}>
          {projects.map((project) => (
            <Card key={project._id}>
              <CardContent>
                <Typography variant="h6">{project.name}</Typography>
                <Stack direction="row" spacing={2} mt={2}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/projects/${project._id}`)}
                  >
                    View Project
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/projects/${project._id}/tasks`)}
                  >
                    View Tasks
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <Typography variant="body1">No projects yet!</Typography>
      )}
    </Box>
  );
}

export default Dashboard;
