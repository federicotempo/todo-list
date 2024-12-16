const renderProjectList = (projects) => {
  const projectList = document.querySelector("#project-list");
  projects.forEach((project) => {
    const projectTitle = document.createElement("li");
    projectTitle.textContent = project.title;
    projectList.appendChild(projectTitle);
  });
};



export { renderProjectList };
