import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  CircularProgress,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch projects data from API
    axios
      .get("https://test-fe.sidak.co.id/api/projects")
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching project data:", error);
        setLoading(false);
      });
  }, []);

  const handleViewTasks = (projectId) => {
    navigate(`/projects/${projectId}/tasks`);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Project List
      </Typography>
    
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/add-project`}
        fullWidth
        style={{ marginBottom: "20px" }}
      >
        Create Project
      </Button>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project, index) => (
                <TableRow key={project.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewTasks(project.id)}
                    >
                      View Tasks
                    </Button>
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

export default ProjectList;
