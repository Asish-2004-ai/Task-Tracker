// client/src/pages/CreateProject.js
import React, { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

function CreateProject() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateProject = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/projects",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Could not create project. You might already have 4 projects.");
    }
  };

  return (
    <div>
      <h2>Create New Project</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleCreateProject}>
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}

export default CreateProject;
