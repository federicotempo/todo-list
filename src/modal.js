import {
  renderProjectList,
  renderNewProjectTitle,
  createTodo,
} from "./domManipulation";
import { projects, Project, Todo, addPendingProjects } from "./logic";

const modal = document.getElementById("modal");
const addProjectButton = document.getElementById("add-project");
const cancelModalButton = document.getElementById("cancel-modal");
const addProjectForm = document.getElementById("add-project-form");
const errorMessage = document.getElementById("error-message");
const projectNameSelect = document.getElementById("project-name");
const newProjectNameInput = document.getElementById("new-project-name");

const openModal = () => {
  modal.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.add("hidden");
  resetForm();
};

const resetForm = () => {
  addProjectForm.reset();
  errorMessage.classList.add("hidden");
  newProjectNameInput.style.display = "none";
};

addProjectButton.addEventListener("click", openModal);
cancelModalButton.addEventListener("click", closeModal);

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

const populateProjectSelect = () => {
  projectNameSelect.innerHTML = "";

  projects.forEach((project) => {
    if (project.title !== "Pending") {
      const option = document.createElement("option");
      option.value = project.title;
      option.text = project.title;
      projectNameSelect.appendChild(option);
    }
  });

  const newOption = document.createElement("option");
  newOption.value = "new";
  newOption.text = "New project...";
  projectNameSelect.appendChild(newOption);
};

projectNameSelect.addEventListener("change", () => {
  if (projectNameSelect.value === "new") {
    newProjectNameInput.style.display = "inline-block";
    newProjectNameInput.setAttribute("name", "new-project-name");
    newProjectNameInput.setAttribute("required", "true");
  } else {
    newProjectNameInput.style.display = "none";
    newProjectNameInput.removeAttribute("name");
    newProjectNameInput.removeAttribute("required");
  }
});

document.addEventListener("DOMContentLoaded", populateProjectSelect);

addProjectForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const projectName = document.getElementById("project-name").value;
  const newProjectName = newProjectNameInput.value.trim();
  const todoTitle = document.getElementById("todo-title").value;
  const todoDescription = document.getElementById("todo-description").value;
  const todoDueDate = document.getElementById("todo-due-date").value;
  const todoPriority = document.getElementById("todo-priority").value;

  const newTodo = new Todo(
    todoTitle,
    todoDescription,
    todoDueDate,
    todoPriority
  );

  if (
    projectName === "new" &&
    projects.some((p) => p.title === newProjectName)
  ) {
    errorMessage.textContent =
      "The project name already exists. Please choose another.";
    errorMessage.classList.remove("hidden");
    newProjectNameInput.focus();
    return;
  }

  if (projectName === "new") {
    const newProject = new Project(newProjectName);
    newProject.addTodo(newTodo);
    projects.push(newProject);
    renderNewProjectTitle(newProjectName);
    createTodo(newProject);
  } else {
    const existingProject = projects.find((p) => p.title === projectName);
    if (existingProject) {
      existingProject.todos.push(newTodo);
      renderNewProjectTitle(projectName);
      createTodo(existingProject);
    }
  }

  renderProjectList(projects);
  addPendingProjects();
  populateProjectSelect();
  closeModal();
});
