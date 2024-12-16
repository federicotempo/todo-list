const renderProjectList = (projects) => {
  const projectList = document.querySelector("#project-list");
  projects.forEach((project) => {
    const projectTitle = document.createElement("li");
    projectTitle.textContent = project.title;
    projectTitle.addEventListener("click", renderProjectTitle);
    projectList.appendChild(projectTitle);
  });
};

const renderProjectTitle = (title) => {
  const projectTitle = document.querySelector("#project-title");
  projectTitle.textContent = title.target.textContent;
};

const displaySidebar = () => {
  const toggleButton = document.querySelector("#toggle-sidebar");
  const sidebar = document.querySelector(".sidebar");

  toggleButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  document.addEventListener("click", (event) => {
    if (!sidebar.contains(event.target) && event.target !== toggleButton) {
      sidebar.classList.remove("open");
    }
  });
};

export { renderProjectList, displaySidebar };
