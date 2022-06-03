'use strict';

import './styles.css';
import './normalize.css';
import { DOM, taskDisplayer, modal, project, menu } from './modules/DOM';
import { Project, Task } from './modules/classes';
import { createTask, renderTask } from './modules/task';
import { renderProject } from './modules/project';
import { loadStorage } from './modules/storage';
import { submitEdit } from './modules/taskDisplayer';

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

function setTaskIndex(index) {
	return (currentTaskIndex = index);
}
function setContainer(container) {
	return (currentTaskContainer = container);
}

function setObject(object) {
	return (currentObject = object);
}

function setProject(project) {
	return (currentProject = project);
}

function setProjectArray(array) {
	return (projectArray = array);
}

if (projectArray.length > 0) {
	loadStorage();
}

DOM.newTask.addEventListener('click', addSubmitEvent);

function addSubmitEvent() {
	modal.form.addEventListener('submit', createTask);
	openModal();
}

function openModal() {
	modal.form.classList.add('active');
}

modal.close.addEventListener('click', () => {
	modal.form.removeEventListener('submit', createTask);
	modal.form.removeEventListener('submit', submitEdit);

	closeModal();
});

function closeModal() {
	modal.form.classList.remove('active');
}

// Display animations after animation end
setTimeout(() => {
	modal.form.style.display = 'grid';
}, 800);
setTimeout(() => {
	menu.container.style.display = 'block';
}, 800);
setTimeout(() => {
	taskDisplayer.container.style.display = 'flex';
}, 800);

export {
	currentProject,
	currentProjectIndex,
	currentTaskIndex,
	currentTaskContainer,
	currentObject,
	projectArray,
	setTaskIndex,
	setContainer,
	setObject,
	openModal,
	setProjectArray,
	setProject,
	updateProjectIndex,
};
