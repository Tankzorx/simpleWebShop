angular.module("ledShop")
.factory("loadingService",["$rootScope",function($rootScope) {

	let currentLoads = 0;

  return {
		isLoading: () => {
			return currentLoads > 0;
		},
    startLoad: () => {
			currentLoads += 1;
			$rootScope.$emit("loadingChange")
			return;
    },
		endLoad: () => {
			currentLoads -= 1;
			$rootScope.$emit("loadingChange")
		}
  };
}])
