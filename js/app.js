//Inheritance (using prototype):
var Man = function(name, age) {
	this.name = name || "JohnDoe";
	this.age = age || 18;
	this.live = function() {
		console.log("Living...");
	};
};
var Student = function(name, age) {
	Man.apply(this, arguments);
	this.study = function() {
		console.log("Studying...");
	};
};
Student.prototype = new Man();
Student.prototype.constructor = Student;
//Sample objects:
//var man = new Man("Max", 35);
//var student = new Student("Stan", 20);

//////////////////////////////

//Inheritance (using Object.create()):
var Man = {
	constructor: function(name, age) {
		this.name = name || "JohnDoe";
		this.age = age || 18;
		this.live = function() {
			console.log("Living...");
		};
		return this;
	}
};
var Student = Object.create(Man);
Student.constructor = function(name, age) {
	Man.constructor.apply(this, arguments);
	this.study = function() {
		console.log("Studying...");
	};
	return this;
};
//Sample objects:
//var man = Object.create(Man).constructor("Max", 35);
//var student = Object.create(Student).constructor("Stan", 20);

//////////////////////////////

//function duckType() (using object)
function duckType(duck) {
	var props = ["name", "age", "live"];
	for (var i = 0; i < props.length; i++) {
		if (!duck.hasOwnProperty(props[i])) return "unknown type";
	}
	return "study" in duck ? "Student" : "Man";
}
//Sample calls:
//console.log(duckType(man)); //output: "Man"
//console.log(duckType(student)); //output: "Student"
//console.log(duckType({})); //output: "unknown type"

//////////////////////////////

//function duckType() (using this)
function duckType() {
	var props = ["name", "age", "live"];
	for (var i = 0; i < props.length; i++) {
		if (!this.hasOwnProperty(props[i])) return "unknown type";
	}
	return "study" in this ? "Student" : "Man";
}
//Sample calls:
//console.log(duckType.call(man)); //output: "Man"
//console.log(duckType.call(student)); //output: "Student"
//console.log(duckType.call({})); //output: "unknown type"
