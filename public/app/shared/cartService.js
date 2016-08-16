angular.module("ledShop")
.factory("cartService",["$q","$http",function($q,$http) {
  let cart = {};
  // let cartId = // Make this be created only once.
  return {
    get: () => {
      return cart;
    },
    addItem: (product,quantity) => {
      if (cart[product._id]) {
        cart[product._id].quantity += quantity;
      } else {
        cart[product._id] = { "quantity" : quantity, "product" : product };
      }
      console.log(cart);
    },
    removeItem: (pid,quantity) => {
      if (cart[pid]) {
        if (quantity) {
          cart[pid].quantity = (cart[pid] - quantity) < 0 ? 0 : (cart[pid] - quantity);
        } else {
          cart[pid].quantity = 0;
        }
      }
    },
    getCartValue: () => {
      console.log("'getCartValue' not implemented yet.");
      return 0;
    },
    getCartValue: () => {
      let total = 0;
      for (pid of Object.keys(cart)) {
        total += cart[pid].product.price * cart[pid].quantity
      }
      return total;
    }
  };
}])
