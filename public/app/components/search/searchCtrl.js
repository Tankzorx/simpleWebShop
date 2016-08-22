angular.module("ledShop")
.controller("searchCtrl",["$scope","$routeParams","loadingService","productsService","$rootScope",
function ($scope,$routeParams,loadingService,productsService,$rootScope) {
	console.log($routeParams);
	let initialQuery = [{"key": "keyword", "value" : $routeParams.keyword || "" }];
	let promise = productsService.search(initialQuery)
	$scope.loading = loadingService.isLoading();
	$scope.noResults = false;

	promise.then((res) => {
		// $scope.loading = loadingService.isLoading();

		if (!res.length) {
			$scope.noResults = true;
		} else {
			$scope.products = res;
		}
	},
	(e) => {
		// $scope.loading = loadingService.isLoading();
		$scope.error = e
	})

	$rootScope.$on("loadingChange", (event,data) => {
		$scope.loading = loadingService.isLoading();
	})

}])
