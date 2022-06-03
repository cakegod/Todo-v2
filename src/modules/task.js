import { DOM, modal } from './DOM';
import {
	currentProjectIndex,
	currentTaskIndex,
	currentTaskContainer,
	projectArray,
	setTaskIndex,
	setContainer,
	setObject,
} from './../index';
import {displayTaskDetails} from './taskDisplayer';

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
		setTaskIndex(projectArray[currentProjectIndex].array.indexOf(newTask));
		setContainer({ task, checkbox, title });
		setObject(projectArray[currentProjectIndex].array[currentTaskIndex]);
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

export { createTask, renderTask, taskColor };
