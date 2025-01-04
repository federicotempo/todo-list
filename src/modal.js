import {
  renderProjectList,
  renderNewProjectTitle,
  createTodo,
} from "./domManipulation";
import { projects, Project, Todo, addPendingProjects } from "./logic";
import { saveToLocalStorage } from "./localStorage";

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
  newProjectNameInput.required = false;
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

  const defaultProjects = ["Work", "Personal"];
  defaultProjects.forEach((projectTitle) => {
    const option = document.createElement("option");
    option.value = projectTitle;
    option.text = projectTitle;
    projectNameSelect.appendChild(option);
  });

  const remainingProjects = projects.filter(
    (project) =>
      project.title !== "Pending Tasks" &&
      !defaultProjects.includes(project.title)
  );

  remainingProjects.forEach((project) => {
    const option = document.createElement("option");
    option.value = project.title;
    option.text = project.title;
    projectNameSelect.appendChild(option);
  });

  const newOption = document.createElement("option");
  newOption.value = "new";
  newOption.text = "New project...";
  projectNameSelect.appendChild(newOption);

  if (remainingProjects.length === 0) {
    projectNameSelect.value = "Work";
  } 

  projectNameSelect.value = "Work";
  
  saveToLocalStorage();
};

projectNameSelect.addEventListener("change", () => {
  if (projectNameSelect.value === "new") {
    newProjectNameInput.style.display = "block";
    newProjectNameInput.required = true;
  } else {
    newProjectNameInput.style.display = "none";
    newProjectNameInput.required = false;
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

  if (projectName === "new" && newProjectName === "") {
    errorMessage.textContent = "Please enter a project name.";
    errorMessage.classList.remove("hidden");
    return;
  }

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
    let existingProject = projects.find((p) => p.title === projectName);
    if (!existingProject) {
      existingProject = new Project(projectName);
      projects.push(existingProject);
    }
    existingProject.todos.push(newTodo);
    renderNewProjectTitle(projectName);
    createTodo(existingProject);
  }

  saveToLocalStorage();
  renderProjectList(projects);
  addPendingProjects();
  populateProjectSelect();
  closeModal();
});

export { populateProjectSelect };
