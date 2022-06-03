import { projectArray, setProjectArray } from './../index';
import { renderTask } from './task';
import { renderProject } from './project';

function saveStorage() {
	localStorage.setItem('projectArray', JSON.stringify(projectArray));
}

function loadStorage() {
	setProjectArray(JSON.parse(localStorage.getItem('projectArray')));
	projectArray[0].array.forEach((task) => renderTask(task));
	projectArray.forEach((project) => checkProjectName(project));
	function checkProjectName(project) {
		if (project.title !== 'home') {
			return renderProject(project);
		}
	}

	console.log(projectArray);
}

export { saveStorage, loadStorage };
