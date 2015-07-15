var Man = function(name, age) {
	if (!name || !age) {
		throw "person must have a name and an age";
	}
	if (!String(name).trim()) {
		throw "name must be at least 1 character long";
	}
	if (parseInt(age) < 1 || parseInt(age) > 99) {
		throw "age must be in range from 1 to 99";
	}

	this.name = String(name).trim();
	this.age = parseInt(age);
};
Man.prototype.live = function() {
	this.age++;
};

var Student = function(name, age) {
	Man.apply(this, arguments);
};
Student.prototype = Object.create(Man.prototype);
Student.prototype.constructor = Student;
Student.prototype.study = function() {
	this.isStudying = true;
};

var Professor = function(name, age, field) {
	Man.apply(this, arguments);
	this.field = field || "Quantum gravity";
	this.students = [];
};
Professor.prototype = Object.create(Man.prototype);
Professor.prototype.constructor = Professor;
Professor.prototype.teach = function(student) {
	if (!student.study) {
		throw "this person can't study";
	}
	if (this.students.indexOf(student) !== -1) {
		throw "this student is already studying here";
	}
	student.study();
	this.students.push(student);
};
Professor.prototype.research = function(field) {
	this.field = field;
};