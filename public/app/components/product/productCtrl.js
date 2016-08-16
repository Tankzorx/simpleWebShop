angular.module("ledShop")
.controller("productCtrl",
["$scope","$routeParams","productsService","cartService",
function ($scope,$routeParams,productsService,cartService) { // Can't use arrow function?
  $scope.msg = "Product Controller Operational";

  $scope.product;
  $scope.error;
  $scope.quantitySelected = 0;
  $scope.true = true;
  $scope.pid = $routeParams.pid;
  let promise = productsService.get($routeParams.pid)

  promise.then(
    (data) => {
      console.log(data);
      $scope.product = data;
    },
    (error) => {
      $scope.error = error;
    }
  )

  $scope.addToCart = () => {
    console.log("Adding:");
    console.log("   - " + $scope.product.productTitle);
    console.log("   - " + $scope.quantitySelected);
    cartService.addItem($scope.product,$scope.quantitySelected)
  }

  $scope.goBack = () => {
    history.back();
  }

}])
