import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "../src/pages/Signup";
import Login from "../src/pages/Login";
import Dashboard from "../src/pages/Dashboard";
import CreateProject from "../src/pages/CreateProject";
import TasksPage from "../src/pages/Task";
import ProjectPage from "../src/pages/projects"; // You'll need to create this component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/projects/:projectId" element={<ProjectPage />} />
        <Route path="/projects/:projectId/tasks" element={<TasksPage />} />
      </Routes>
    </Router>
  );
}

export default App;
