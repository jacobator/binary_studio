var Model = function(modelData) {
	//adding data to Model
	for (var prop in modelData) {
		this[prop] = modelData[prop];
	}
};

var Controller = function(controllerData) {
	//adding data to Controller
	for (var prop in controllerData) {
		this[prop] = controllerData[prop];
	}
	//rendering View
	var containerElement = document.getElementById(this.elementId);
	containerElement.innerHTML = this.render();
	//check changes function
	this.checkModel = function() {
		if (this.model.changed) {
			containerElement.innerHTML = this.render();
			this.model.changed = false;
		}
	}
	//starting check changes function
	var self = this;
	setInterval(function() {self.checkModel();}, 100);
	//adding click handlers
	var activateClickHandler = function(e) {
		var clickHandlerName = self.clickHandlers["#" + e.target.id];
		if (clickHandlerName) {
			self[clickHandlerName]();
		}
	}
	containerElement.addEventListener("click", activateClickHandler);
};

var Student = new Model({
	name: "Piotr",
	age: 22,
	year: 5,
	examsTaken: 2,
	takeExam: function() {
		this.examsTaken++;
		this.changed = true;
	}
});

var StudentController = new Controller({
	model: Student,
	elementId: "student-container",
	render: function() {
		return "<span>" + this.model.name + "</span><button id='student-exams-button'>Increase exams taken</button>";
	},
	clickHandlers: {
		"#student-exams-button": "updateExams"
	},
	updateExams: function() {
		this.model.takeExam();
	}
});