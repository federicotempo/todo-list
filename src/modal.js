const modal = document.getElementById("modal");
const addProjectButton = document.getElementById("add-project");
const cancelModalButton = document.getElementById("cancel-modal");
const submitModalButton = document.getElementById("submit-modal");
const addProjectForm = document.getElementById("add-project-form");

const openModal = () => {
  modal.classList.remove("hidden"); 
};

const closeModal = () => {
  modal.classList.add("hidden"); 
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

  const projectName = document.getElementById("project-name").value;
  const todoTitle = document.getElementById("todo-title").value;
  const todoDescription = document.getElementById("todo-description").value;
  const todoDueDate = document.getElementById("todo-due-date").value;
  const todoPriority = document.getElementById("todo-priority").value;

  // Aquí puedes agregar la lógica para guardar el nuevo proyecto y tarea
  console.log("Nuevo Proyecto:", projectName);
  console.log("Nuevo Todo:", {
    title: todoTitle,
    description: todoDescription,
    dueDate: todoDueDate,
    priority: todoPriority,
  });

  closeModal(); 
});