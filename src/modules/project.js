import { DOM, project, menu } from "./DOM";
import { renderTask } from "./task";
import { saveStorage } from "./storage";
import {
  projectArray,
  currentProjectIndex,
  setProject,
  updateProjectIndex,
} from "./global";

class Project {
  constructor(title, array) {
    this.title = title;
    this.array = array;
  }
}

const newProject = new Project("home", []);
projectArray.push(newProject);

function clearTasks() {
  DOM.taskWrapper.textContent = "";
}

// Display the form and hides the 'New Project' button
function displayForm() {
  project.container.classList.remove("inactive");
  project.new.classList.add("inactive");
}

function updateProject(title) {
  setProject(title);
  updateProjectIndex();
  clearTasks();
  projectArray[currentProjectIndex].array.forEach((task) => renderTask(task));
  DOM.tasksTitle.textContent = title.charAt(0).toUpperCase() + title.slice(1);
}

// Clear Project input
function projectInputClear() {
  project.container.classList.add("inactive");
  project.container.reset();
}

// Hide form and displays 'New Project' button
function hideForm() {
  project.container.classList.add("inactive");
  project.new.classList.remove("inactive");
}

// Render Project on the DOM
function renderProject(currentProject) {
  const title = document.createElement("li");
  title.className = "project-title";
  title.textContent = currentProject.title;
  project.list.appendChild(title);
  title.addEventListener("click", () => {
    updateProject(currentProject.title);
  });
}

menu.home.addEventListener("click", () => {
  updateProject("home");
});

menu.today.addEventListener("click", () => {
  const flatMap = projectArray.flatMap((eachProject) => eachProject.array);

  flatMap.filter((task) => task.date === "2022-06-08");
});

// Mobile display animation
project.new.addEventListener("click", displayForm);

// Creates the Project
function createProject(event) {
  event.preventDefault();
  const newProject = new Project(project.input.value, []);
  projectArray.push(newProject);
  renderProject(newProject);
  saveStorage();
  projectInputClear();
  hideForm();
}

// Submits the new Project
project.container.addEventListener("submit", createProject);

export { Project, renderProject };
