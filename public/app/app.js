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

// Copied shamelessly from http://stackoverflow.com/questions/16310298/if-a-ngsrc-path-resolves-to-a-404-is-there-a-way-to-fallback-to-a-default
app.directive('errSrc', function() {
	return {
		link: function(scope, element, attrs) {
			element.bind('error', function() {
				if (attrs.src != attrs.errSrc) {
					attrs.$set('src', attrs.errSrc);
				}
			});
		}
	}
});
