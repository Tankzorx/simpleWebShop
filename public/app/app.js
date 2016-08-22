var app = angular.module("ledShop",["ngRoute"]);

app.config(["$routeProvider","$locationProvider",($routeProvider,$locationProvider) => {

  $locationProvider.html5Mode(true);
  $routeProvider
    .when("/shop/home", {
      templateUrl: "app/components/home/home.html",
      controller: "homeCtrl"
    })

    .when("/shop/checkout", {
      templateUrl: "app/components/checkout/checkout.html",
      controller: "checkoutCtrl"
    })

    .when("/shop/about", {
      templateUrl: "app/components/about/about.html",
      controller: "aboutCtrl"
    })

    .when("/shop/cart", {
      templateUrl: "app/components/cart/cart.html",
      controller: "cartCtrl"
    })

    .when("/shop/search", {
      templateUrl: "app/components/search/search.html",
      controller: "searchCtrl"
    })

    .when("/shop/product/:pid", {
      templateUrl: "app/components/product/product.html",
      controller: "productCtrl"
    })

    .otherwise({
      redirectTo: "/shop/home"
    })

}])
