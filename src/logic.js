import * as dom from "./domManipulation";
import { loadProjectsFromLocalStorage } from "./localStorage";

const projects = [];

class Project {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }
}

class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

const todo1 = new Todo(
  "Plan team meeting",
  "Schedule and prepare the agenda for next week's team meeting",
  "2024-11-01",
  "High"
);

const todo2 = new Todo(
  "Prepare presentation",
  "Create slides for the annual project review presentation",
  "2024-12-03",
  "Low"
);

const todo3 = new Todo(
  "Call mom",
  "Catch up with mom and check on her health",
  "2024-02-10",
  "Medium"
);

const pendingProject = new Project("Pending Tasks");
const workProject = new Project("Work");
const personalProject = new Project("Personal");

workProject.addTodo(todo1);
workProject.addTodo(todo2);
personalProject.addTodo(todo3);

const addPendingProjects = () => {
  pendingProject.todos.length = 0;
  projects.slice(1).forEach((project) => {
    pendingProject.todos.push(...project.todos);
  });
};

function initialize() {
  loadProjectsFromLocalStorage();

  dom.renderProjectList(projects);
  dom.renderProjectTitle(projects);
  dom.displaySidebar();
  dom.hideSidebar();
  addPendingProjects();
  dom.createTodo(pendingProject);
}

initialize();

export {
  projects,
  Project,
  Todo,
  addPendingProjects,
  workProject,
  pendingProject,
  personalProject,
};
