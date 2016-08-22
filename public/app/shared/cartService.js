angular.module("ledShop")
.factory("cartService",["$q","$http","$rootScope",function($q,$http,$rootScope) {
  let cart = {};
  let userId = localStorage.getItem("webShopUser");

  /**
   * INITIALIZATION
   */
  let getCartPromise = $http.get("users/" + userId);
  getCartPromise.then((res) => {
		// console.log(res);
    if (!res.data.user) {
      return;
    };
    for (item of res.data.user.cart) {
      cart[item.product._id] = {quantity : item.quantity, product : item.product}
    }
    $rootScope.$emit("cartChange")
  },(error) => {
    console.log(error);
  })
  /**
   * END INITIALIZATION
   */

  let saveCart = (userId,cart) => {
    let saveCartPromise = $http.post("users/save/" + userId, cart)
    saveCartPromise.then((res) => {
			console.log(res.data.userId);
      userId = res.data.userId;
      localStorage.setItem("webShopUser",userId);
    },(res) => {
      console.log(res);
    })
    return saveCartPromise.promise;
  }


  return {
    getCartPromise : getCartPromise.promise,
    get: () => {
      return cart;
    },
    addItem: (product,quantity) => {
      if (quantity <= 0) {
        return;
      }
      if (cart[product._id]) {
        cart[product._id].quantity += quantity;
      } else {
        cart[product._id] = { "quantity" : quantity, "product" : product };
      };

      // Save the cart on server.
      saveCart(userId,cart);
      // Let listeners know that we added an item.
      $rootScope.$emit("cartChange",{"product":product,"quantity":quantity})
    },
    removeItem: (pid,quantity) => {
      if (cart[pid]) {
        if (quantity) {
          cart[pid].quantity = (cart[pid] - quantity) < 0 ? 0 : (cart[pid] - quantity);
        } else {
          cart[pid].quantity = 0;
        }
      };
      // Save the cart on server.
      saveCart(userId,cart);
      $rootScope.$emit("cartChange");
    },
    getCartValue: () => {
      let total = 0;
      for (pid of Object.keys(cart)) {
        total += cart[pid].product.price * cart[pid].quantity
      }
      return total;
    },
    saveCart: (cart) => {
      cart = cart;
      saveCart(userId,cart);
      $rootScope.$emit("cartChange");
    }
  };
}])
