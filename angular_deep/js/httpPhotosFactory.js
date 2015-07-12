(function() {
	"use strict";

	angular
		.module("app")
		.factory("httpPhotosFactory", httpPhotosFactory);

	httpPhotosFactory.$inject = ["$http"];

	function httpPhotosFactory($http) {
		var service = {
			getPhoto: getPhoto,
			getPhotos: getPhotos
		};
		return service;

		function getPhoto(id) {
			return $http.get("http://jsonplaceholder.typicode.com/photos/" + id)
				.then(requestCompleted)
				.catch(requestFailed);
		}

		function getPhotos() {
			return $http.get("http://jsonplaceholder.typicode.com/photos")
				.then(requestCompleted)
				.catch(requestFailed);
		}

		function requestCompleted(response) {
			return response.data;
		}

		function requestFailed(error) {
			console.log("Error:", error);
		}
	}
})();