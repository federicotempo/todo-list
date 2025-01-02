import { renderProjectList } from "./domManipulation";
import { projects, Project, Todo } from "./logic";

const modal = document.getElementById("modal");
const addProjectButton = document.getElementById("add-project");
const cancelModalButton = document.getElementById("cancel-modal");
const addProjectForm = document.getElementById("add-project-form");
const errorMessage = document.getElementById("error-message");

const projectsTitles = projects.map((project) => project.title);

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
};

addProjectButton.addEventListener("click", openModal);
cancelModalButton.addEventListener("click", closeModal);

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

addProjectForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const projectName = document.getElementById("project-name").value.trim();
  const todoTitle = document.getElementById("todo-title").value;
  const todoDescription = document.getElementById("todo-description").value;
  const todoDueDate = document.getElementById("todo-due-date").value;
  const todoPriority = document.getElementById("todo-priority").value;

  const isDuplicateProjectName = checkProjectName(projectName);
  
  if (isDuplicateProjectName === false) {
    const newProject = new Project(projectName);
    const newTodo = new Todo(
      todoTitle,
      todoDescription,
      todoDueDate,
      todoPriority
    );

    newProject.addTodo(newTodo);
    projects.push(newProject);
    console.log(projects);
    closeModal();
  }
});

const checkProjectName = (projectName) => {
  if (projectsTitles.includes(projectName)) {
    const errorMessage = document.getElementById("error-message");
    errorMessage.classList.remove("hidden");
    errorMessage.textContent =
      "The project name already exists, please choose another one.";
  } else {
    return false;
  }
};
