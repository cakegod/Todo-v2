'use strict';

import './styles.css';
import './normalize.css';
import { DOM, taskDisplayer, modal, project, menu } from './modules/DOM';
import { Project, Task } from './modules/classes';

const projectArray = [];
const newProject = new Project('home', []);
projectArray.push(newProject);
const newProject2 = new Project('test1', []);
projectArray.push(newProject2);
const newProject3 = new Project('test2', []);
projectArray.push(newProject3);

function updateProjectIndex() {
	currentProjectIndex = projectArray.findIndex(
		(array) => array.title === currentProject,
	);
}
let currentProject = 'home';

let currentProjectIndex = 0;
let currentTaskIndex;
let currentTaskContainer;
let currentObject;

////// MODAL

//// SUBMIT
// Event
DOM.newTask.addEventListener('click', addSubmitEvent);
// Open modal and add an event to the submit to add a new task
function addSubmitEvent() {
	modal.form.addEventListener('submit', createTask);
	openModal();
}

//// OPEN
function openModal() {
	modal.form.classList.add('active');
}

//// CLOSE
// Event to the close button, removes all submit events
modal.close.addEventListener('click', () => {
	modal.form.removeEventListener('submit', createTask);
	modal.form.removeEventListener('submit', submitEdit);

	closeModal();
});
// Close modal
function closeModal() {
	modal.form.classList.remove('active');
}

function createTask(event) {
	event.preventDefault();
	const newTask = new Task(
		modal.title.value,
		modal.description.value,
		modal.date.value,
		modal.priority.value,
	);
	pushTask(newTask);
}

function pushTask(newTask) {
	projectArray[currentProjectIndex].array.push(newTask);
	console.log(projectArray);
	renderTask(newTask);
}

function renderTask(newTask) {
	const task = document.createElement('div');
	const checkbox = document.createElement('span');
	const title = document.createElement('p');

	DOM.taskWrapper.appendChild(task);
	task.appendChild(checkbox);
	task.appendChild(title);

	checkbox.className = 'material-icons-outlined checkbox';
	checkbox.textContent = 'radio_button_unchecked';
	title.textContent = newTask.title;

	function checkboxToggle() {
		if (newTask.checkbox) {
			checkbox.textContent = 'radio_button_checked';
			task.className = 'task checked-priority';
			newTask.checkbox = false;
		} else {
			taskColor(newTask, task);
			checkbox.textContent = 'radio_button_unchecked';
			newTask.checkbox = true;
		}
	}

	taskColor(newTask, task);

	checkbox.addEventListener('click', () => {
		checkboxToggle();
	});

	task.addEventListener('click', () => {
		displayTaskDetails(newTask);
		checkboxToggle();
		currentTaskIndex = projectArray[currentProjectIndex].array.indexOf(newTask);
		currentTaskContainer = { task, checkbox, title };
		currentObject = projectArray[currentProjectIndex].array[currentTaskIndex];
		console.log(
			currentTaskIndex,
			currentProjectIndex,
			projectArray[currentProjectIndex].array[currentTaskIndex],
			currentTaskContainer,
		);
	});
}

function taskColor(object, container) {
	switch (object.priority) {
		case 'low':
			container.className = 'task low-priority';
			break;
		case 'medium':
			container.className = 'task medium-priority';
			break;
		case 'high':
			container.className = 'task high-priority';
			break;
		default:
			container.className = 'task low-priority';
	}
}

function displayTaskDetails(newTask) {
	taskDisplayer.title.textContent = newTask.title;
	taskDisplayer.description.textContent = newTask.description;
	taskDisplayer.date.textContent = newTask.date;

	if (newTask.priority === 'high') {
		taskDisplayer.priority.style.color = 'var(--red-high)';
	} else if (newTask.priority === 'medium') {
		taskDisplayer.priority.style.color = 'var(--yellow-med)';
	} else {
		taskDisplayer.priority.style.color = 'var(--green-low)';
	}
}

taskDisplayer.delete.addEventListener('click', () => {
	deleteTask();
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

	console.log(currentObject, projectArray);
}

// Mobile display animation
project.new.addEventListener('click', displayForm);
// Display the form and hides the 'New Project' button
function displayForm() {
	project.container.classList.remove('inactive');
	project.new.classList.add('inactive');
}

// Submits the new Project
project.container.addEventListener('submit', createProject);

// Creates the Project
function createProject(event) {
	event.preventDefault();
	const newProject = new Project(project.input.value, []);
	projectArray.push(newProject);
	projectRender(newProject);
	projectInputClear();
	hideForm();
	console.log(projectArray);
}

// Clear Project input
function projectInputClear() {
	project.container.classList.add('inactive');
	project.container.reset();
}

// Hide form and displays 'New Project' button
function hideForm() {
	project.container.classList.add('inactive');
	project.new.classList.remove('inactive');
}

// Render Project on the DOM
function projectRender(newProject) {
	const title = document.createElement('li');
	title.className = 'project-title';
	title.textContent = newProject.title;
	project.list.appendChild(title);
	title.addEventListener('click', () => {
		currentProject = newProject.title;
		updateProjectIndex();
		clearTasks()
		projectArray[currentProjectIndex].array.forEach((task) => renderTask(task));
		console.log(currentProject, currentProjectIndex, projectArray[currentProjectIndex]);
	});
}

menu.home.addEventListener('click', () => {
	currentProject = 'home';
	updateProjectIndex();
	clearTasks();
	projectArray[currentProjectIndex].array.forEach((task) => renderTask(task));
	console.log(
		currentProject,
		currentProjectIndex,
		projectArray[currentProjectIndex],
	);
});

function clearTasks() {
	DOM.taskWrapper.textContent = '';
}
