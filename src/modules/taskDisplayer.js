import {taskDisplayer, modal} from './DOM';
import {
	currentProjectIndex,
	currentTaskIndex,
	currentTaskContainer,
	currentObject,
	projectArray,
	openModal,
} from './../index';
import { taskColor } from './task';
import { saveStorage } from './storage';

function displayTaskDetails() {
	taskDisplayer.title.textContent = currentObject.title;
	taskDisplayer.description.textContent = currentObject.description;
	taskDisplayer.date.textContent = currentObject.date;

	if (currentObject.priority === 'high') {
		taskDisplayer.priority.style.color = 'var(--red-high)';
	} else if (currentObject.priority === 'medium') {
		taskDisplayer.priority.style.color = 'var(--yellow-med)';
	} else {
		taskDisplayer.priority.style.color = 'var(--green-low)';
	}
}

taskDisplayer.delete.addEventListener('click', () => {
	deleteTask();
	saveStorage();
});

function deleteTask() {
	projectArray[currentProjectIndex].array.splice(currentTaskIndex, 1);
	currentTaskContainer.task.remove();
	console.log(projectArray);
}

taskDisplayer.edit.addEventListener('click', () => {
	editTask();
});

function editTask() {
	openModal();
	modal.form.addEventListener('submit', submitEdit);
	modal.title.value = currentObject.title;
	modal.description.value = currentObject.description;
	modal.date.value = currentObject.date;
	modal.priority.value = currentObject.priority;
}

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

	console.log(currentObject, projectArray);
}

export { displayTaskDetails, submitEdit };
