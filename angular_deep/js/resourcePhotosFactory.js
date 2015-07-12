(function() {
	"use strict";

	angular
		.module("app")
		.factory("resourcePhotosFactory", resourcePhotosFactory);

	resourcePhotosFactory.$inject = ["$resource"];

	function resourcePhotosFactory($resource) {
		var service = {
			getPhoto: getPhoto,
			getPhotos: getPhotos
		};
		var Photos = $resource("http://jsonplaceholder.typicode.com/photos/:id", {id: "@id"});
		return service;

		function getPhoto(id) {
			return Photos.get({id: id}, requestCompleted, requestFailed);
		}

		function getPhotos() {
			return Photos.query(requestCompleted, requestFailed);
		}

		function requestCompleted(response) {
			return response;
		}

		function requestFailed(error) {
			console.log("Error:", error);
		}
	}
})();