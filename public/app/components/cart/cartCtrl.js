angular.module("ledShop")
.controller("cartCtrl",["$scope","cartService",function ($scope,cartService) {
  $scope.cart = cartService.get();
  $scope.totalCost = cartService.getCartValue();
}])
