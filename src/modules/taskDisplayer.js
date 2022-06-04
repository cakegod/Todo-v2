import { taskDisplayer, modal } from "./DOM";
import { taskColor, displayTaskDetails} from "./task";
import { saveStorage } from "./storage";
import {
  projectArray,
  currentProjectIndex,
  currentTaskIndex,
  currentTaskContainer,
  currentObject,
} from "./global";

function openModal() {
  modal.form.classList.add("active");
}

function closeModal() {
  modal.form.classList.remove("active");
}

function clearModal() {
  modal.form.reset();
}


function deleteTask() {
  projectArray[currentProjectIndex].array.splice(currentTaskIndex, 1);
  currentTaskContainer.task.remove();
}

taskDisplayer.delete.addEventListener("click", () => {
  deleteTask();
  saveStorage();
});

function submitEdit(event) {
  event.preventDefault();
  currentObject.title = modal.title.value;
  currentObject.description = modal.description.value;
  currentObject.date = modal.date.value;
  currentObject.priority = modal.priority.value;
  currentTaskContainer.title.textContent = modal.title.value;
  taskColor(currentObject, currentTaskContainer.task);
  saveStorage();
  displayTaskDetails();
  closeModal();
}

function editTask() {
  openModal();
  modal.form.addEventListener("submit", submitEdit);
  modal.title.value = currentObject.title;
  modal.description.value = currentObject.description;
  modal.date.value = currentObject.date;
  modal.priority.value = currentObject.priority;
}

taskDisplayer.edit.addEventListener("click", () => {
  editTask();
});



export {submitEdit, openModal, closeModal, clearModal}
