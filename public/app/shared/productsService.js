angular.module("ledShop")
.factory("productsService",["$q","$http","loadingService",function($q,$http,loadingService) {
	return {
		get: (id) => {
			let q = $q.defer();
			let req;
			loadingService.startLoad();
			if (id) {
				req = $http.get("products/" + id)
			} else {
				req = $http.get("products/")
			}

			req.then(
				(res) => {
					loadingService.endLoad();
					q.resolve(res.data.products);
				},
				(error) => {
					loadingService.endLoad();
					q.reject(error.error);
				}
			)
			return q.promise;
		},
		search: (queryList) => {
			// loadingService.startLoad();
			loadingService.startLoad();
			let queryString = "?";
			for (queryItem of queryList) {
				queryString += queryItem.key + "=" + queryItem.value + "&";
			};
			let q = $q.defer();
			let req = $http.get("products/search" + queryString)

			req.then((res) => {
				loadingService.endLoad();
				q.resolve(res.data.products);
			},
			(error) => {
				loadingService.endLoad();
				q.reject(error.error);
			});

			return q.promise;
		}
	};
}])
