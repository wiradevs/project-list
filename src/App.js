import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProjectList from "./Components/ProjectList";
import AddProjectForm from "./Components/AddProjectForm";
import TaskDetail from "./Components/TaskDetail";
import CreateTask from "./Components/CreateTask";
import EditTask from "./Components/EditTask";

const App = () => {
  return (
    <Router>
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          padding: "10px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
          Projects
        </Link>
        
      </nav>
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/add-project" element={<AddProjectForm />} />
        <Route path="/projects/:idProject/tasks" element={<TaskDetail />} />

        <Route path="/projects/:idProject/tasks/create" element={<CreateTask />} />
        <Route path="/projects/:idProject/tasks/edit/:taskId" element={<EditTask />} />
      </Routes>
    </Router>
  );
};

export default App;