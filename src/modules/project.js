import { DOM, project, menu } from './DOM';
import {
	currentProject,
	setProject,
	updateProjectIndex,
	projectArray,
	currentProjectIndex,
} from './../index';
import { renderTask } from './task';

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
		setProject(newProject.title);
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
	setProject('home');
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

export { renderProject };
