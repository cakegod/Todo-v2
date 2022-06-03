'use strict';

import './styles.css';
import './normalize.css';
import { DOM, taskDisplayer, modal, project, menu } from './modules/DOM';
import { Project, Task } from './modules/classes';


let projectArray = [];
const newProject = new Project('home', []);
projectArray.push(newProject);

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
	saveStorage();
}

function saveStorage() {
	localStorage.setItem('projectArray', JSON.stringify(projectArray));
}

if (projectArray.length > 0) {
	loadStorage();
}

function loadStorage() {
	projectArray = JSON.parse(localStorage.getItem('projectArray'));
	projectArray[0].array.forEach((task) => renderTask(task))
	projectArray.forEach(project => checkProjectName(project));
	function checkProjectName(project) {
		if (project.title !== "home") 
			return renderProject(project)
	};

	
	console.log(projectArray);
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
			checkbox.textContent = 'radio_button_unchecked';
			newTask.checkbox = false;
			taskColor(newTask, task);
		} else {
			checkbox.textContent = 'radio_button_checked';
			task.className = 'task checked-priority';
			newTask.checkbox = true;
		}
	}

	taskColor(newTask, task);

	checkbox.addEventListener('click', () => {
		checkboxToggle();
	});

	task.addEventListener('click', () => {
		currentTaskIndex = projectArray[currentProjectIndex].array.indexOf(newTask);
		currentTaskContainer = { task, checkbox, title };
		currentObject = projectArray[currentProjectIndex].array[currentTaskIndex];
		displayTaskDetails();
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
	renderProject(newProject);
	saveStorage();
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
function renderProject(newProject) {
	const title = document.createElement('li');
	title.className = 'project-title';
	title.textContent = newProject.title;
	project.list.appendChild(title);
	title.addEventListener('click', () => {
		currentProject = newProject.title;
		updateProjectIndex();
		clearTasks();
		projectArray[currentProjectIndex].array.forEach((task) => renderTask(task));
		console.log(
			currentProject,
			currentProjectIndex,
			projectArray[currentProjectIndex],
		);
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

menu.today.addEventListener('click', () => {
	const flatMap = projectArray.flatMap((project) => project.array);

	flatMap.filter((task) => task.date === '2022-06-08');
});

function clearTasks() {
	DOM.taskWrapper.textContent = '';
}

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
