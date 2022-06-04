import { DOM, modal, taskDisplayer } from "./DOM";
import { saveStorage } from "./storage";
import {
  currentProjectIndex,
  currentTaskIndex,
  projectArray,
  setContainer,
  setObject,
  setTaskIndex,
  currentObject,
} from "./global";
import { clearModal } from "./taskDisplayer";

class Task {
  constructor(title, description, date, priority, checkbox) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.checkbox = checkbox;
  }
}

function taskColor(object, container) {
  const currentContainer = container;
  switch (object.priority) {
    case "low":
      currentContainer.className = "task low-priority";
      break;
    case "medium":
      currentContainer.className = "task medium-priority";
      break;
    case "high":
      currentContainer.className = "task high-priority";
      break;
    default:
      currentContainer.className = "task low-priority";
  }
}

function displayTaskDetails() {
  taskDisplayer.title.textContent = currentObject.title;
  taskDisplayer.description.textContent = currentObject.description;
  taskDisplayer.date.textContent = currentObject.date;

  if (currentObject.priority === "high") {
    taskDisplayer.priority.style.color = "var(--red-high)";
  } else if (currentObject.priority === "medium") {
    taskDisplayer.priority.style.color = "var(--yellow-med)";
  } else {
    taskDisplayer.priority.style.color = "var(--green-low)";
  }
}

function renderTask(newTask) {
  const task = document.createElement("div");
  const checkbox = document.createElement("span");
  const title = document.createElement("p");

  DOM.taskWrapper.appendChild(task);
  task.appendChild(checkbox);
  task.appendChild(title);

  taskColor(newTask, task);

  checkbox.className = "material-icons-outlined checkbox";
  if (newTask.checkbox) {
    checkbox.textContent = "radio_button_checked";
    task.className = "task checked-priority";
  } else checkbox.textContent = "radio_button_unchecked";

  title.textContent = newTask.title;

  function checkboxToggle() {
    const currentTask = newTask;
    if (newTask.checkbox) {
      checkbox.textContent = "radio_button_unchecked";
      currentTask.checkbox = false;
      taskColor(newTask, task);
    } else {
      checkbox.textContent = "radio_button_checked";
      task.className = "task checked-priority";
      currentTask.checkbox = true;
    }
    saveStorage();
  }

  checkbox.addEventListener("click", () => {
    checkboxToggle();
  });

  task.addEventListener("click", () => {
    setTaskIndex(projectArray[currentProjectIndex].array.indexOf(newTask));
    setContainer({ task, checkbox, title });
    setObject(projectArray[currentProjectIndex].array[currentTaskIndex]);
    displayTaskDetails();
  });
}

function pushTask(newTask) {
  projectArray[currentProjectIndex].array.push(newTask);
  renderTask(newTask);
  saveStorage();
}

function createTask(event) {
  event.preventDefault();
  const newTask = new Task(
    modal.title.value,
    modal.description.value,
    modal.date.value,
    modal.priority.value
  );
  pushTask(newTask);
  clearModal();
}

export { createTask, renderTask, taskColor, displayTaskDetails };
