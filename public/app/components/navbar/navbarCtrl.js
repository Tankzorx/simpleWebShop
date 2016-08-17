angular.module("ledShop")
.controller("navbarCtrl",["$scope","$location","$rootScope","$timeout","cartService",
function ($scope,$location,$rootScope,$timeout,cartService) {
  $scope.title = "LED shoppen lel";
  $scope.showNotification = false;
  $scope.notification = "";
  $scope.cartValue = cartService.getCartValue();

  $rootScope.$on("cartChange", (event,data) => {
    // $scope.notification = "Added " + data.quantity + " '" + data.product.productTitle + "' to the cart!";
    if (data) {
      $scope.notification = "Added '" + data.product.productTitle + "' to cart";
      $scope.showNotification = true;
    }
    $scope.cartValue = cartService.getCartValue();
    $timeout(function () {
      $scope.showNotification = false;
    }, 3000);
  })
  $scope.search = () => {
    $location.url("/shop/search/" + $scope.searchQuery)
  }
}])
