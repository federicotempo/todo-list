const renderProjectList = (projects) => {
  const projectList = document.querySelector("#project-list");
  projects.forEach((project) => {
    const projectTitle = document.createElement("li");
    projectTitle.textContent = project.title;
    projectTitle.addEventListener("click", changeProjectTitle);
    projectList.appendChild(projectTitle);
  });
};

const changeProjectTitle = (project) => {
  const projectTitle = document.querySelector("#project-title");
  projectTitle.textContent = project.target.textContent;
};

const renderTodos = (projects) => {
  const projectList = document.querySelector("#project-list");
  const listProject = projectList.querySelectorAll("li");
  listProject.forEach((li) => {
    li.addEventListener("click", () => {
      for (const project of projects) {
        if (project.title === li.textContent) {
          createTodo(project);
        }
      }
    });
  });
};

const createTodo = (project) => {
  const taskList = document.querySelector("#task-list");
  cleanList(taskList);
  project.todos.forEach((todo) => {
    const task = document.createElement("li");
    task.classList.add("task");
    const taskTitle = document.createElement("div");
    taskTitle.classList.add("task-title");
    taskTitle.textContent = todo.title;
    const description = document.createElement("span");
    description.classList.add("description");
    description.textContent = todo.description;
    const taskDetails = document.createElement("div");
    taskDetails.classList.add("task-details");
    const priority = document.createElement("span");
    priority.classList.add("priority");
    priority.style.backgroundColor = "#ffeb3b";
    const date = document.createElement("span");
    date.classList.add("date");
    date.textContent = todo.dueDate;
    const taskDelete = document.createElement("button");
    taskDelete.classList.add("task-delete");
    taskDelete.textContent = "✕";
    taskDetails.append(priority, date, taskDelete);
    taskTitle.appendChild(description);
    task.append(taskTitle, taskDetails);
    taskList.appendChild(task);
  });
};

const cleanList = (taskList) => {
  taskList.innerHTML = "";
}

const renderProjectTitle = (projects) => {
  const projectTitle = document.querySelector("#project-title");
  projectTitle.textContent = projects[0].title;
};

const displaySidebar = () => {
  const toggleButton = document.querySelector("#toggle-sidebar");
  const sidebar = document.querySelector(".sidebar");

  toggleButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
};

const hideSidebar = () => {
  const toggleButton = document.querySelector("#toggle-sidebar");
  const sidebar = document.querySelector(".sidebar");
  const projectList = document.querySelectorAll("#project-list");

  document.addEventListener("click", (event) => {
    if (!sidebar.contains(event.target) && event.target !== toggleButton) {
      sidebar.classList.remove("open");
    }
  });

  projectList.forEach((project) => {
    project.addEventListener("click", () => {
      sidebar.classList.remove("open");
    });
  });
};

export {
  renderProjectList,
  displaySidebar,
  hideSidebar,
  renderProjectTitle,
  renderTodos,
};
