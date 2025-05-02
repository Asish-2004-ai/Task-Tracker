import React, { useEffect, useState, useCallback } from "react";
import axios from "../utils/axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";

const TasksPage = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", status: "pending" });

  const backendURL = "http://localhost:5000/api";

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get(`${backendURL}/projects/${projectId}/tasks`, {
        headers: getAuthHeader(),
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch tasks");
    }
  }, [backendURL, projectId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendURL}/projects/${projectId}/tasks`, form, {
        headers: getAuthHeader(),
      });
      setForm({ title: "", description: "", status: "Pending" });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to create task");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${backendURL}/projects/${projectId}/tasks/${taskId}`, {
        headers: getAuthHeader(),
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      await axios.put(`${backendURL}/tasks/${taskId}`, { status }, {
        headers: getAuthHeader(),
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to update task");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Tasks
      </Typography>

      <Box component="form" onSubmit={createTask} sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 500 }}>
        <TextField
          label="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <TextField
          label="Description"
          multiline
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <Select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          label="Status"
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="in progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
        <Button type="submit" variant="contained" color="primary">
          Add Task
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        {tasks.length === 0 ? (
          <Typography>No tasks found.</Typography>
        ) : (
          <Grid container spacing={2}>
            {tasks.map((task) => (
              <Grid item xs={12} md={6} lg={4} key={task._id}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {task.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {task.description}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ mt: 1 }}>
                      Status: {task.status}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="outlined" onClick={() => updateTaskStatus(task._id, "Pending")}>
                      Pending
                    </Button>
                    <Button size="small" variant="outlined" color="warning" onClick={() => updateTaskStatus(task._id, "In Progress")}>
                      In Progress
                    </Button>
                    <Button size="small" variant="outlined" color="success" onClick={() => updateTaskStatus(task._id, "Completed")}>
                      Completed
                    </Button>
                    <Button size="small" variant="contained" color="error" onClick={() => deleteTask(task._id)}>
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default TasksPage;
