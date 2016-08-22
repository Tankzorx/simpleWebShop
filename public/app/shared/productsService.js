angular.module("ledShop")
.factory("productsService",["$q","$http",function($q,$http) {
  return {
    get: (id) => {
      let q = $q.defer();
      let req;
      if (id) {
        req = $http.get("products/" + id)
      } else {
        req = $http.get("products/")
      }

      req.then(
        (res) => {
          q.resolve(res.data.products);
        },
        (error) => {
          q.reject(error.error);
        }
      )
      return q.promise;
    }
  };
}])
