import {
  getLocalStorage,
  getLocalStorageItemIndex,
  setLocalStorage,
  removeLocalStorageKey,
  getResponsiveImage,
} from "./utils.mjs";

export default class Cart {
  constructor(key, listElement) {
    this.key = key;
    this.listElement = listElement;
  }

  init() {
    this.renderCartContents();
    this.addEventListeners();
  }

  cartItemTemplate(item) {
    return `
      <li class="cart-card divider">
        <a href="#" class="cart-card__image">
          <img src="${getResponsiveImage(item)}" alt="${item.Name}" />
        </a>
        <a href="#">
          <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  //check if cart is empty
  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".cart-list").innerHTML =
      "<p>Your cart is empty.</p>";
    return;
  }

  // if cart not empty, render the cart items and calculate total
  cartList.init();

  const cartTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.FinalPrice;
    });
    return total.toFixed(2);
  };

  const totalAmount = cartTotal();

  document.getElementById("total").innerHTML = `${totalAmount}`;
}

renderCartContents();

// When the cart page loads, and after it has pulled any cart items from local storage check to see if there is anything in the cart
// If there are items in the cart, show the html element added above, then calculate the total of the items, create some HTML to display it ($${total}) and insert it into the element.
        <div class="cart-actions">
          <div class="quantity-control">
            <button class="qty-btn add" data-id="${item.Id}">+</button>
            <span class="qty-text">${item.Quantity}</span>
            <button class="qty-btn subtract" data-id="${item.Id}">-</button>
            <button class="qty-btn remove" data-id="${item.Id}">X</button>
          </div>
          <p class="cart-card__price">$${(
            item.FinalPrice * item.Quantity
          ).toFixed(2)}</p>
        </div>
      </li>
    `;
  }

  renderCartContents() {
    if (!this.listElement) return;

    const cartItems = getLocalStorage(this.key) || [];
    this.listElement.innerHTML = "";

    if (cartItems.length > 0) {
      this.listElement.innerHTML = cartItems
        .map((item) => this.cartItemTemplate(item))
        .join("");
      this.calculateCartTotal(cartItems);
    } else {
      this.listElement.innerHTML = "<p>Your cart is empty.</p>";
      this.calculateCartTotal(null);
    }
  }

  calculateCartTotal(items) {
    const cartFooter = document.querySelector(".cart-footer");
    if (!cartFooter) return;

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
    if (totalAmount) {
      totalAmount.textContent = total.toFixed(2);
      cartFooter.classList.remove("hide");
    }
  }

  changeQuantity(change, itemId) {
    let cartItems = getLocalStorage(this.key) || [];
    let itemIndex = getLocalStorageItemIndex(cartItems, "Id", itemId);

    if (itemIndex < 0) return;

    switch (change) {
      case "add":
        cartItems[itemIndex].Quantity += 1;
        break;
      case "subtract":
        if (cartItems[itemIndex].Quantity === 1) {
          cartItems.splice(itemIndex, 1);
        } else {
          cartItems[itemIndex].Quantity -= 1;
        }
        break;
    }

    if (cartItems.length === 0) {
      removeLocalStorageKey(this.key);
    } else {
      setLocalStorage(this.key, cartItems);
    }

    this.renderCartContents();
  }

  removeItem(itemId) {
    let cartItems = getLocalStorage(this.key) || [];
    let itemIndex = getLocalStorageItemIndex(cartItems, "Id", itemId);

    if (itemIndex > -1) {
      cartItems.splice(itemIndex, 1);
      if (cartItems.length === 0) {
        removeLocalStorageKey(this.key);
      } else {
        setLocalStorage(this.key, cartItems);
      }
    }

    this.renderCartContents();
  }

  addEventListeners() {
    if (!this.listElement) return;

    this.listElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("add")) {
        this.changeQuantity("add", e.target.dataset.id);
      }
      if (e.target.classList.contains("subtract")) {
        this.changeQuantity("subtract", e.target.dataset.id);
      }
      if (e.target.classList.contains("remove")) {
        this.removeItem(e.target.dataset.id);
      }
    });
  }
}
