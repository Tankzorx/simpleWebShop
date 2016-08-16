angular.module("ledShop")
.directive("navbardirective",function() {
	return {
		restrict: "E",
		templateUrl: "app/components/navbar/navbar.html",
		controller: "navbarCtrl"
	}
});
