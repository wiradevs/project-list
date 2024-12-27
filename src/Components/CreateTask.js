// CreateTask.js
import React, { useState } from "react";
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Container, Typography } from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CreateTask = () => {
  const { idProject } = useParams(); // Getting the project ID from the URL
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("To Do");
  const navigate = useNavigate();

  const handleCreateTask = () => {
    if (taskName && taskStatus) {
      axios
        .post(`https://test-fe.sidak.co.id/api/projects/${idProject}/tasks`, {
          name: taskName,
          status: taskStatus,
        })
        .then((response) => {
          navigate(`/projects/${idProject}/tasks`); // Redirect back to task list after creating
        })
        .catch((error) => console.error("Error creating task:", error));
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Create New Task
      </Typography>
      <TextField
        label="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          label="Status"
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value)}
        >
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleCreateTask} fullWidth>
        Create Task
      </Button>
    </Container>
  );
};

export default CreateTask;
