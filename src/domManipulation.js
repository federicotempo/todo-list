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

const chooseTodos = (projects) => {
  console.log(projects);
  const projectList = document.querySelector("#project-list");
  const listProject = projectList.querySelectorAll("li");
  listProject.forEach((li) => {
    li.addEventListener("click", () => {
      for (const project of projects) {
        if (project.title === li.textContent) {
          console.log(project);
          renderTodo(project);
        }
      }
    });
  });
};

// const renderTodo = (project) => {
//   const taskList = document.querySelector("#task-list");

// }

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
  chooseTodos,
};
