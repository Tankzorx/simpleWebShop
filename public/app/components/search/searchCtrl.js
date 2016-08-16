angular.module("ledShop")
.controller("searchCtrl",["$scope","$routeParams",function ($scope,$routeParams) {
  $scope.searchQuery = $routeParams.searchQuery;
  $scope.msg = "Search control actervated";
}])
