angular.module("storeApp", [])

.controller("ListController", function($scope) {
	$scope.products = [{
		name: "T-shirt",
		price: 5
	},
	{
		name: "Hat",
		price: 9.99
	},
	{
		name: "Socks",
		price: .99
	},
	{
		name: "Coat",
		price: 50.5
	},
	{
		name: "Gloves",
		price: 10
	}];

	$scope.customers = [{
		name: "Peter Parker",
		city: "New York",
		age: 18,
		avatar: "http://lorempixel.com/50/50/cats/1"
	},
	{
		name: "Sarah Connor",
		city: "Los Angeles",
		age: 30,
		avatar: "http://lorempixel.com/50/50/cats/2"
	},
	{
		name: "Tobias Reaper",
		city: "London",
		age: 56,
		avatar: "http://lorempixel.com/50/50/cats/3"
	},
	{
		name: "Thomas Anderson",
		city: "New York",
		age: 27,
		avatar: "http://lorempixel.com/50/50/cats/4"
	}];

	$scope.productsVisibility = true;
	$scope.customersVisibility = true;

	$scope.toggle = function(listVisibility) {
		$scope[listVisibility] = !$scope[listVisibility];
	};

	$scope.addProduct = function() {
		$scope.products.push({
			name: "Untitled product",
			price: getRandomNumber(1, 9999)/100
		});
	};

	$scope.addCustomer = function() {
		$scope.customers.push({
			name: "John Doe",
			city: "Utopia",
			age: getRandomNumber(15, 90),
			avatar: "http://lorempixel.com/50/50/cats/" + getRandomNumber(1, 10)
		});
	};

	$scope.deleteCustomer = function(index) {
		$scope.customers.splice(index, 1);
	};
})

.filter("nameFilter", function() {
	return function(name) {
		return "User: " + name.toUpperCase();
	}
});

var getRandomNumber = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};