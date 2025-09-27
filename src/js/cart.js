import { getLocalStorage } from "./utils.mjs";
import CartList from "./shoppingCart.mjs";

const listElement = document.querySelector(".cart-list");

const cartList = new CartList("so-cart", listElement);

import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  //fix cart error and add a message if cart is empty
  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".cart-list").innerHTML =
      "<p>Your cart is empty.</p>";
    return;
  }

  cartList.init();
}

renderCartContents();
