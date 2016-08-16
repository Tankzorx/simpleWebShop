angular.module("ledShop")
.controller("navbarCtrl",["$scope","$location",function ($scope,$location) {
  $scope.title = "LED shoppen lel";
  $scope.search = () => {
    console.log("lel")
    $location.url("/shop/search/" + $scope.searchQuery)
  }
}])
