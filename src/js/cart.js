import {
  getLocalStorage,
  getLocalStorageItemIndex,
  setLocalStorage,
  removeLocalStorageKey,
  loadHeaderFooter,
  getResponsiveImage,
} from "./utils.mjs";

import { getLocalStorage } from "./utils.mjs";
import CartList from "./shoppingCart.mjs";

const listElement = document.querySelector(".cart-list");

const cartList = new CartList("so-cart", listElement);

import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${getResponsiveImage(item)}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>

      <div class="cart-actions">
        <div class="quantity-control">
          <button class="qty-btn add" data-id="${item.Id}">+</button>
          <span class="qty-text">${item.Quantity}</span>
          <button class="qty-btn subtract" data-id="${item.Id}">-</button>
          <button class="qty-btn remove" data-id="${item.Id}">X</button>
        </div>
        <p class="cart-card__price">$${(item.FinalPrice * item.Quantity).toFixed(2)}</p>
      </div>
    </li>
  `;
}

function renderCartContents() {
  const container = document.querySelector(".product-list");
  container.innerHTML = "";
  let cartItems = getLocalStorage("so-cart") || [];

  if (cartItems.length > 0) {
    container.innerHTML = cartItems.map(cartItemTemplate).join("");
    calculateCartTotal(cartItems);
  } else {
    container.innerHTML = "The Cart Is Empty";
    calculateCartTotal(null);
  }
}

function calculateCartTotal(items) {
  const cartFooter = document.querySelector(".cart-footer");
  if (!items || items.length === 0) {
    cartFooter.classList.add("hide");
    return;
  }

  let total = 0;
  items.forEach((item) => {
    const price = parseFloat(item.FinalPrice || item.price || 0);
    const quantity = item.Quantity || 1;
    total += price * quantity;
  });

  const totalAmount = document.querySelector(".cart-total");
  if (totalAmount && cartFooter) {
    totalAmount.textContent = total.toFixed(2);
    cartFooter.classList.remove("hide");
  }
}

function changeQuantity(change, itemId) {
  const cartList = getLocalStorage("so-cart") || [];
  let itemIndex = getLocalStorageItemIndex(cartList, "Id", itemId);

  if (itemIndex < 0) return;

  switch (change) {
    case "add":
      cartList[itemIndex].Quantity += 1;
      break;
    case "subtract":
      if (cartList[itemIndex].Quantity === 1) {
        cartList.splice(itemIndex, 1);
      } else {
        cartList[itemIndex].Quantity -= 1;
      }
      break;
  }

  if (cartList.length === 0) {
    removeLocalStorageKey("so-cart");
  } else {
    setLocalStorage("so-cart", cartList);
  }

  renderCartContents();

  const cartItems = getLocalStorage("so-cart");
  //fix cart error and add a message if cart is empty
  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".cart-list").innerHTML =
      "<p>Your cart is empty.</p>";
    return;
  }

  cartList.init();

}

function removeItem(itemId) {
  let cartItems = getLocalStorage("so-cart") || [];
  let itemIndex = getLocalStorageItemIndex(cartItems, "Id", itemId);

  if (itemIndex > -1) {
    cartItems.splice(itemIndex, 1);
    if (cartItems.length === 0) {
      removeLocalStorageKey("so-cart");
    } else {
      setLocalStorage("so-cart", cartItems);
    }
  }

  renderCartContents();
}

// Delegated event handling for cart actions
document.querySelector(".product-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("add")) {
    changeQuantity("add", e.target.dataset.id);
  }
  if (e.target.classList.contains("subtract")) {
    changeQuantity("subtract", e.target.dataset.id);
  }
  if (e.target.classList.contains("remove")) {
    removeItem(e.target.dataset.id);
  }
});

// Initial render
renderCartContents();
