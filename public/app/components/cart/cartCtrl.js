angular.module("ledShop")
.controller("cartCtrl",["$scope","cartService","$rootScope",
function ($scope,cartService,$rootScope) {
  $scope.cart = cartService.get();
  $scope.totalCost = cartService.getCartValue();

  $scope.makeArray = (int) => {
    int = parseInt(int);
    int += 10;

    retval = new Array(int);
    for(let i = 0; i < int; i++) {
      retval[i] = i;
    }
    return retval;
  }
  $scope.saveCart = () => {
    console.log("hue");
    cartService.saveCart($scope.cart);
  }

  $rootScope.$on("cartChange",(event,data) => {
    $scope.totalCost = cartService.getCartValue();
    $scope.cart = cartService.get();
  })
}])
