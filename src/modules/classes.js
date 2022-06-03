class Project {
	constructor(title, array) {
		this.title = title;
		this.array = array;
	}
}

class Task {
	constructor(title, description, date, priority, checkbox) {
		this.title = title;
		this.description = description;
		this.date = date;
		this.priority = priority;
		this.checkbox = checkbox;
	}
}

export { Project, Task };
