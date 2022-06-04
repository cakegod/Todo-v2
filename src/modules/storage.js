import { projectArray, setProjectArray } from "./global";
import { renderTask } from "./task";
import { renderProject } from "./project";

function saveStorage() {
  localStorage.setItem("projectArray", JSON.stringify(projectArray));
}

function loadStorage() {
  setProjectArray(JSON.parse(localStorage.getItem("projectArray")));
  // Render home tasks
  projectArray[0].array.forEach((task) => renderTask(task));

  // If the project is not 'home' then render the projects on the DOM
  function checkProjectName(currentProject) {
    if (currentProject.title !== "home") {
      renderProject(currentProject);
    }
  }
  projectArray.forEach((currentProject) => checkProjectName(currentProject));
}

if (localStorage.getItem("projectArray") !== null) {
  loadStorage();
}

export { saveStorage, loadStorage };
