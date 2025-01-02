import * as dom from "./domManipulation";

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
  "Finish report",
  "Complete the monthly report",
  "2024/12/15",
  "High"
);

const todo2 = new Todo(
  "Finish time",
  "Complete the week report",
  "2024/12/16",
  "Low"
);

const todo3 = new Todo(
  "Clean the dishes",
  "Get the house clean",
  "2024/12/10",
  "Medium"
);

const pendingProject = new Project("Pending");
const workProject = new Project("Work");
const personalProject = new Project("Personal");

workProject.addTodo(todo1);
workProject.addTodo(todo2);
personalProject.addTodo(todo3);

projects.push(pendingProject);
projects.push(workProject);
projects.push(personalProject);

const addPendingProjects = () => {
  pendingProject.todos.length = 0;
  projects.slice(1).forEach((project) => {
    pendingProject.todos.push(...project.todos);
  });
};

function initialize() {
  dom.renderProjectList(projects);
  dom.renderProjectTitle(projects);
  dom.displaySidebar();
  dom.hideSidebar();
  addPendingProjects();
  dom.createTodo(pendingProject);
  
}

initialize();

export {projects, Project, Todo, addPendingProjects }