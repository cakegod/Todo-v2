'use strict';

import './styles.css';
import './normalize.css';
import { DOM, menu, modal, taskDisplayer } from './modules/DOM';

import { Project, Task } from './modules/classes';

const projectArray = [];
const newProject = new Project('home', []);
projectArray.push(newProject);
const newProject2 = new Project('test1', []);
projectArray.push(newProject2);
const newProject3 = new Project('test2', []);
projectArray.push(newProject3);

let currentProject = 'home';

let index = projectArray.findIndex((array) => array.title === currentProject);

// Open modal
DOM.newTask.addEventListener('click', () => {
	modal.form.classList.add('active');
});

// Close modal
modal.close.addEventListener('click', () => {
	modal.form.classList.remove('active');
});

// Submit modal
modal.submit.addEventListener('click', (event) => {
	createTask(event);
});

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
	projectArray[index].array.push(newTask);
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

	function taskColor() {
	switch (newTask.priority) {
		case 'low':
			task.className = 'task low-priority';
			break;
		case 'medium':
			task.className = 'task medium-priority';
			break;
		case 'high':
			task.className = 'task high-priority';
			break;
		default:
			task.className = 'task low-priority';
	}
}

	function checkboxToggle() {
		if (newTask.checkbox) {
			checkbox.textContent = 'radio_button_checked';
			task.className = 'task checked-priority';
			newTask.checkbox = false;
		} else {
			taskColor();
			checkbox.textContent = 'radio_button_unchecked';
			newTask.checkbox = true;
		}
	}

	checkboxToggle();

	checkbox.addEventListener('click', () => {
		checkboxToggle();
	});

	task.addEventListener('click', () => {
		displayTaskDetails(newTask)
	})

}

function displayTaskDetails(newTask) {
	taskDisplayer.title.textContent = newTask.title;
	taskDisplayer.description.textContent = newTask.description;
	taskDisplayer.date.textContent = newTask.date;

	if (newTask.priority === "high") {
		taskDisplayer.priority.style.color = "var(--red-high)";
	} else if (newTask.priority === "medium") {
		taskDisplayer.priority.style.color = "var(--yellow-med)";
	} else {
		taskDisplayer.priority.style.color = "var(--green-low)";
	}
function deleteTaskButton () {
	if (currentTask) {
		projectArray[currentProjectN].array.splice(
			projectArray[currentProjectN].array.indexOf(currentTask),
			1
		);
		console.log(projectArray);
		currentTaskContainer.remove();
		taskDisplayer.title.textContent = "";
		taskDisplayer.description.textContent = "";
		taskDisplayer.date.textContent = "";
	}
}

}



