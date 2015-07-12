(function() {
	"use strict";

	angular
		.module("app")
		.controller("ListController", ListController);

	ListController.$inject = ["httpPhotosFactory", "resourcePhotosFactory"];

	function ListController(httpPhotosFactory, resourcePhotosFactory) {
		var vm = this;
		var limit = 100;
		vm.photos = [];

		activate();

		function activate() {
			httpPhotosFactory.getPhotos()
				.then(function(data) {
					vm.photos = data.splice(0, limit);
					return vm.photos;
				});
		}

		/*function activate() {
			resourcePhotosFactory.getPhotos().$promise
				.then(function(data) {
					vm.photos = data.splice(0, limit);
					return vm.photos;
				});
		}*/
	}
})();