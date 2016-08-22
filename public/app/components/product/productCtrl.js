angular.module("ledShop")
.controller("productCtrl",
["$scope","$routeParams","productsService","cartService","$timeout",
function ($scope,$routeParams,productsService,cartService,$timeout) { // Can't use arrow function?
  $scope.msg = "Product Controller Operational";

  $scope.product;
  $scope.error;
  $scope.quantitySelected = 0;
  $scope.true = true;
  $scope.pid = $routeParams.pid;
  $scope.justAdded = false;
	$scope.selectedImage = 0;


	let promise = productsService.get($routeParams.pid)
  promise.then(
    (data) => {
      $scope.product = data;
    },
    (error) => {
      $scope.error = error;
    }
  )

  $scope.addToCart = () => {
    if ($scope.quantitySelected === 0) {
       return;
    }
    $scope.justAdded = true;
    $timeout(() => {
      $scope.justAdded = false;
    }, 1500);
    cartService.addItem($scope.product,$scope.quantitySelected)
    $scope.quantitySelected = 0;
  };

	$scope.selectImage = (index) => {
		console.log($scope.product.images);

		index = index % ($scope.product.images.length);
		console.log(index);
		$scope.selectedImage = index;
	}

  $scope.goBack = () => {
    history.back();
  }

}])
