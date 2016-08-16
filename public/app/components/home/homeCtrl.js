angular.module("ledShop")
.controller("homeCtrl",["$scope","productsService",function ($scope,productsService) { // Can't use arrow function?
  $scope.msg = "Home Controller Operational";
  $scope.data;
  let promise = productsService.get()

  promise.then(
    (data) => {
      $scope.products = data;
    },
    (error) => {
      $scope.error = error;
    }
  )

}])
