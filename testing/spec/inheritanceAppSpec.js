describe("Inheritance app", function() {
	describe("Man", function() {
		behaveAsMan(Man);
	});

	describe("Student", function() {
		behaveAsMan(Student);

		describe("Unique Student behavior", function() {
			var student;

			beforeEach(function() {
				student = new Student("Alex", 20);
			});

			it("should be able to study", function() {
				expect(student.study).toBeDefined();
			});

			it("should start studying when asked to", function() {
				student.study();
				expect(student.isStudying).toBe(true);
			});
		});
	});

	describe("Professor", function() {
		behaveAsMan(Professor);

		describe("Unique Professor behavior", function() {
			var professor;

			beforeEach(function() {
				professor = new Professor("J_Smith", 40);
			});

			it("should have a proper field of research and empty list of students", function() {
				expect(professor.field).toBe("Quantum gravity");
				expect(professor.students).toEqual([]);
				professor = new Professor("Ben Robin", 45, "Theoretical physics");
				expect(professor.field).toBe("Theoretical physics");
				expect(professor.students).toEqual([]);
			});

			it("should be able to teach and research", function() {
				expect(professor.teach).toBeDefined();
				expect(professor.research).toBeDefined();
			});

			it("should add student to students list when teaching him and make him start studying", function() {
				var student = new Student("Alex", 22);
				professor.teach(student);
				expect(professor.students.length).toBe(1);
				expect(professor.students.indexOf(student)).not.toBe(-1);
				expect(student.isStudying).toBe(true);
			});

			it("should throw an exception when student is not able to study or is already studying here", function() {
				var student = new Student("Alex", 22);
				var man = new Man("Peter", 30);
				professor.teach(student);
				expect(function() {
					professor.teach(man);
				}).toThrow("this person can't study");
				expect(function() {
					professor.teach(professor);
				}).toThrow("this person can't study");
				expect(function() {
					professor.teach(student);
				}).toThrow("this student is already studying here");
			});

			it("should change field of research when starting to research something", function() {
				professor.research("Cookies");
				expect(professor.field).toBe("Cookies");
			});
		});
	});
});

function behaveAsMan(Person) {
	describe("Shared Man behavior", function() {
		var person;

		beforeEach(function() {
			person = new Person("John Doe", 22);
		});

		it("should throw an exception if no proper name or age is defiened", function() {
			expect(function() {
				new Person();
			}).toThrow("person must have a name and an age");
			expect(function() {
				new Person(8);
			}).toThrow("person must have a name and an age");
			expect(function() {
				new Person(undefined);
			}).toThrow("person must have a name and an age");
			expect(function() {
				new Person("Jake", undefined);
			}).toThrow("person must have a name and an age");
			expect(function() {
				new Person("Jeremy", 0);
			}).toThrow("person must have a name and an age");
			expect(function() {
				new Person("   ", 15);
			}).toThrow("name must be at least 1 character long");
			expect(function() {
				new Person("  peter   ", 150);
			}).toThrow("age must be in range from 1 to 99");
			expect(function() {
				new Person("Tom_Hanks", -10);
			}).toThrow("age must be in range from 1 to 99");
			expect(function() {
				new Person("  peter22", "150yo");
			}).toThrow("age must be in range from 1 to 99");
		});

		it("should have a proper name and age", function() {
			expect(person.name).toBe("John Doe");
			expect(person.age).toBe(22);
			person = new Person("       Ali_G2", "40");
			expect(person.name).toBe("Ali_G2");
			expect(person.age).toBe(40);
			person = new Person("Mike II Peterson   ", "30years old");
			expect(person.name).toBe("Mike II Peterson");
			expect(person.age).toBe(30);
		});

		it("should be able to live", function() {
			expect(person.live).toBeDefined();
		});

		it("should increase age when living", function() {
			var age = person.age;
			person.live();
			expect(person.age).toBe(age + 1);
		});
	});
}