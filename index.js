const express = require("express");
const server = express();

// Diz ao Express para ler informações no formato JSON no corpo das requisições
server.use(express.json());

const projects = [];

let reqCounter = 0;

function projectExists(req, res, next) {
  const { id } = req.params;
  if (!projects.find(p => p.id === id)) {
    return res.status(400).json({ error: "Project not found" });
  }

  return next();
}

function logRequests(req, res, next) {
  reqCounter++;

  console.log(`${reqCounter} requisição(ões) feita(s)`);

  return next();
}

server.use(logRequests);

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  projects.push({
    id,
    title,
    tasks: []
  });

  return res.json(projects);
});

server.post("/projects/:id/tasks", projectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);
  project.tasks.push(title);

  return res.json(project);
});

server.put("/projects/:id", projectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);
  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", projectExists, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(p => p.id === id);
  projects.splice(projectIndex, 1);

  return res.json(projects);
});

server.listen(3000);
