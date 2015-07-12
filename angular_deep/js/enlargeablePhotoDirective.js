(function() {
	"use strict";

	angular
		.module("app")
		.directive("enlargeablePhoto", enlargeablePhoto);

	function enlargeablePhoto() {
		var directive = {
			restrict: "A",
			link: link
		}
		return directive;

		function link(scope, element, attrs) {
			var enlaregedContainer = document.createElement("div");
			var largePhoto = document.createElement("img");
			var photosList = document.getElementById("photos-list");
			enlaregedContainer.id = "large-photo-container";
			largePhoto.setAttribute("src", scope.photo.url);
			enlaregedContainer.appendChild(largePhoto);
			attrs.$set("title", "click to enlarge");
			element.on("click", showLargePhoto);

			function showLargePhoto() {
				photosList.appendChild(enlaregedContainer);
				enlaregedContainer.addEventListener("click", deleteLargePhoto);
			}

			function deleteLargePhoto() {
				enlaregedContainer.removeEventListener("click", deleteLargePhoto);
				photosList.removeChild(enlaregedContainer);
			}
		}
	}
})();