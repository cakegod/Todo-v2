let projectArray = [];
let currentProject = "home";
let currentProjectIndex = 0;
let currentTaskIndex;
let currentTaskContainer;
let currentObject;

function updateProjectIndex() {
  currentProjectIndex = projectArray.findIndex(
    (array) => array.title === currentProject
  );
}

function setTaskIndex(index) {
  currentTaskIndex = index;
  return currentTaskIndex;
}
function setContainer(container) {
  currentTaskContainer = container;
  return currentTaskContainer;
}

function setObject(object) {
  currentObject = object;
  return currentObject;
}

function setProject(project) {
  currentProject = project;
  return currentProject;
}

function setProjectArray(array) {
  projectArray = array;
  return projectArray;
}

export {
  projectArray,
  currentProject,
  currentProjectIndex,
  currentTaskIndex,
  currentTaskContainer,
  currentObject,
  updateProjectIndex,
  setTaskIndex,
  setContainer,
  setObject,
  setProject,
  setProjectArray,
};
