import "./styles.css";
import "./normalize.css";
import { taskDisplayer, modal, menu, DOM } from "./modules/DOM";
import { createTask } from "./modules/task";
import { submitEdit, openModal, closeModal, clearModal } from "./modules/taskDisplayer";



function addSubmitEvent() {
  modal.form.addEventListener("submit", createTask);
  openModal();
}

DOM.newTask.addEventListener("click", addSubmitEvent);

modal.close.addEventListener("click", () => {
  modal.form.removeEventListener("submit", createTask);
  modal.form.removeEventListener("submit", submitEdit);
  clearModal();
  closeModal();
});

function displayMenu() {
  menu.container.classList.toggle("display");
  if (menu.hamburger.textContent === "menu") {
    menu.hamburger.textContent = "close";
  } else menu.hamburger.textContent = "menu";
}

// Hamburger Menu
menu.hamburger.addEventListener("click", displayMenu);

// Display animations after animation end
setTimeout(() => {
  modal.form.style.display = "grid";
}, 800);
setTimeout(() => {
  menu.container.style.display = "block";
}, 800);
setTimeout(() => {
  taskDisplayer.container.style.display = "flex";
}, 800);
