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
          q.resolve(res.data);
        },
        (error) => {
          q.reject(error);
        }
      )
      return q.promise;
    }
  };
}])
