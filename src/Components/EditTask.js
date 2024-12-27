// EditTask.js
import React, { useState, useEffect } from "react";
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Container, Typography } from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditTask = () => {
  const { idProject, taskId } = useParams(); // Getting the project ID and task ID from the URL
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("To Do");
  const navigate = useNavigate();

  // Fetch the task details to edit
  useEffect(() => {
    axios
      .get(`https://test-fe.sidak.co.id/api/tasks/${taskId}`)
      .then((response) => {
        setTaskName(response.data.name);
        setTaskStatus(response.data.status);
      })
      .catch((error) => console.error("Error fetching task data:", error));
  }, [taskId]);

  const handleUpdateTask = () => {
    if (taskName && taskStatus) {
      axios
        .put(`https://test-fe.sidak.co.id/api/tasks/${taskId}`, {
          name: taskName,
          status: taskStatus,
        })
        .then((response) => {
          navigate(`/projects/${idProject}/tasks`); // Redirect back to task list after updating
        })
        .catch((error) => console.error("Error updating task:", error));
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Edit Task
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
      <Button variant="contained" color="primary" onClick={handleUpdateTask} fullWidth>
        Update Task
      </Button>
    </Container>
  );
};

export default EditTask;
