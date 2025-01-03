// import { Project, Todo, projects } from "./logic";

// function saveProjectsToLocalStorage() {
//   localStorage.setItem("projects", JSON.stringify(projects));
// }

// function loadProjectsFromLocalStorage() {
//   const storedProjects = JSON.parse(localStorage.getItem("projects"));
//   if (storedProjects) {
//     storedProjects.forEach((projectData) => {
//       const project = new Project(projectData.title);
//       projectData.todos.forEach((todoData) => {
//         const todo = new Todo(
//           todoData.title,
//           todoData.description,
//           todoData.dueDate,
//           todoData.priority
//         );
//         project.addTodo(todo)
//       });
//       projects.push(project);
//     });
//   }
// }

// export { saveProjectsToLocalStorage, loadProjectsFromLocalStorage }
