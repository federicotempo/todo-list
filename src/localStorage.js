import {
  projects,
  Project,
  Todo,
  pendingProject,
  workProject,
  personalProject,
  addPendingProjects,
} from "./logic";

import { renderProjectList } from "./domManipulation";

const saveToLocalStorage = () => {
  localStorage.setItem("projects", JSON.stringify(projects));
};

const loadProjectsFromLocalStorage = () => {
  const savedProjects = localStorage.getItem("projects");

  if (savedProjects) {
    const parsedProjects = JSON.parse(savedProjects);
    parsedProjects.forEach((projectData) => {
      const project = new Project(projectData.title);
      projectData.todos.forEach((todoData) => {
        const todo = new Todo(
          todoData.title,
          todoData.description,
          todoData.dueDate,
          todoData.priority
        );
        project.addTodo(todo);
      });
      projects.push(project);
    });
  } else {
    addPendingProjects();
    projects.push(pendingProject);
    projects.push(workProject);
    projects.push(personalProject);
    
  }
  
};

export { saveToLocalStorage, loadProjectsFromLocalStorage };
