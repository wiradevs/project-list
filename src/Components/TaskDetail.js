// TaskDetail.js
import React, { useState, useEffect } from "react";
import { Container, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem, FormControl } from "@mui/material";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const TaskDetail = () => {
  const { idProject } = useParams(); // Getting the project ID from the URL
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks for the given project
  useEffect(() => {
    axios
      .get(`https://test-fe.sidak.co.id/api/projects/${idProject}/tasks`)
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching task data:", error);
        setLoading(false);
      });
  }, [idProject]);

  // Handle status update
  const handleStatusUpdate = (taskId, newStatus) => {
    axios
      .put(`https://test-fe.sidak.co.id/api/tasks/${taskId}`, {
        status: newStatus,
      })
      .then((response) => {
        // Update task status in the state after successful update
        setTasks(
          tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        );
      })
      .catch((error) => console.error("Error updating task status:", error));
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Task List for Project {idProject}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/projects/${idProject}/tasks/create`}
        fullWidth
        style={{ marginBottom: "20px" }}
      >
        Create Task
      </Button>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Task Name</TableCell>
                <TableCell>Status</TableCell>
    
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task, index) => (
                <TableRow key={task.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      <Select
                        value={task.status}
                        onChange={(e) =>
                          handleStatusUpdate(task.id, e.target.value)
                        }
                      >
                        <MenuItem value="To Do">To Do</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default TaskDetail;
