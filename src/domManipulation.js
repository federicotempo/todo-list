import { projects } from "./logic";

const renderProjectList = (projects) => {
  const projectList = document.querySelector("#project-list");
  cleanList(projectList);

  projects.forEach((project) => {
    const projectTitle = document.createElement("li");
    projectTitle.textContent = project.title;
    projectTitle.addEventListener("click", changeProjectTitle);
    projectList.appendChild(projectTitle);
  });
};

const renderProjectTitle = (projects) => {
  const projectTitle = document.querySelector("#project-title");
  projectTitle.textContent = projects[0].title;
};

const renderNewProjectTitle = (project) => {
  const projectTitle = document.querySelector("#project-title");
  projectTitle.textContent = project;
};

const changeProjectTitle = (project) => {
  const projectTitle = document.querySelector("#project-title");
  projectTitle.textContent = project.target.textContent;
  renderTodos(project);
  console.log(projects);
};

const renderTodos = (projectName) => {
  projects.forEach((project) => {
    if (projectName.target.textContent === project.title) {
      createTodo(project);
    }
  });
};

const createTodo = (project) => {
  const taskList = getTodos();
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
    const priorityColor = choosePriorityColor(todo.priority);
    priority.style.backgroundColor = priorityColor;

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

const getTodos = () => {
  const taskList = document.querySelector("#task-list");
  return taskList;
};

const cleanList = (list) => {
  list.innerHTML = "";
};

const choosePriorityColor = (todoPriority) => {
  if (todoPriority === "High") {
    return "red";
  } else if (todoPriority === "Medium") {
    return "yellow";
  } else {
    return "green";
  }
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

const handleDeleteTask = () => {
  const deleteButtons = document.querySelectorAll(
    ".task .task-details .task-delete"
  );
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => deleteTask(event));
  });
};

const deleteTask = (event) => {
  const projectTitle = document.querySelector("#project-title").textContent;
  const task = event.target.closest(".task");
  const taskDetails = task.querySelector(".task-title");
  const span = taskDetails.querySelector("span");
  const taskTitle = taskDetails.textContent
    .replace(span.textContent, "")
    .trim();

  if (task) {
    task.remove();
  }

  projects.forEach((project) => {
    if (project.title === projectTitle) {
      project.todos = project.todos.filter((todo) => todo.title !== taskTitle);
    }
  });

  if (projectTitle === "Pending") {
    projects.forEach((project) => {
      for (const todo of project.todos) {
        if (todo.title === taskTitle) {
          project.todos = project.todos.filter(
            (task) => task.title !== taskTitle
          );
        }
      }
    });
  }
};

export {
  renderProjectList,
  displaySidebar,
  hideSidebar,
  renderProjectTitle,
  createTodo,
  renderNewProjectTitle,
  handleDeleteTask,
};
