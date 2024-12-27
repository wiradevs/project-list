import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProjectForm = () => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("https://test-fe.sidak.co.id/api/projects", formData)
      .then(() => {
        setLoading(false);
        navigate("/"); // Redirect to the project list
      })
      .catch((error) => {
        console.error("Error creating project:", error);
        setLoading(false);
      });
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Add New Project
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 600, margin: "auto" }}
      >
        <TextField
          label="Project Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? "Saving..." : "Save Project"}
        </Button>
      </Box>
    </Container>
  );
};

export default AddProjectForm;