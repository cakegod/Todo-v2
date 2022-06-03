
const DOM = {
	newTask: document.querySelector(".new-task"),
	task: document.querySelectorAll(".task"),
	checkbox: document.querySelectorAll(".checkbox"),
	taskWrapper: document.querySelector(".task-wrapper"),
	tasksTitle: document.querySelector(".tasks-title"),
	menuTitle: document.querySelector(".menu-title"),
};

const menu = {
	home: document.querySelector(".home"),
	today: document.querySelector(".today"),
	week: document.querySelector(".week"),
	container: document.querySelector(".list-container"),
	hamburger: document.querySelector(".hamburger-menu"),
};

const taskDisplayer = {
	container: document.querySelector(".form-container"),
	edit: document.querySelector(".box-edit"),
	delete: document.querySelector(".box-delete"),
	title: document.querySelector(".box-title"),
	description: document.querySelector(".box-description"),
	priority: document.querySelector(".material-icons-outlined.priority"),
	date: document.querySelector(".box-date"),
};

const modal = {
	form: document.querySelector(".modal"),
	close: document.querySelector(".modal-close"),
	submit: document.querySelector(".modal-submit"),
	date: document.getElementById("m-date"),
	title: document.getElementById("m-title"),
	description: document.getElementById("m-description"),
	priority: document.getElementById("m-priority"),
};

const project = {
	// Menu
	menu: document.querySelector(".projects"),
	new: document.querySelector(".new-project"),
	list: document.querySelector(".project-list"),
	// Input
	container: document.querySelector(".new-project-container"),
	input: document.querySelector(".project-submit"),
	button: document.querySelector(".project-submit-button"),
};




export {
DOM, taskDisplayer, modal, project, menu 
};
