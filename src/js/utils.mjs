// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// ✅ Only one clean version
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (!parentElement) {
    console.warn("renderListWithTemplate: parentElement not found");
    return;
  }
  if (clear) parentElement.innerHTML = "";
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) callback(data);
}

export async function loadTemplate(path) {
  const item = await fetch(path);
  const template = await item.text();
  return template;
}

export async function loadHeaderFooter() {
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  const headerContent = await loadTemplate("../partials/header.html");
  const footerContent = await loadTemplate("../partials/footer.html");

  renderWithTemplate(headerContent, header);
  renderWithTemplate(footerContent, footer);

  updateCartCount();
}

function updateCartCount() {
  const countElement = document.querySelector(".cart-count");
  const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  if (countElement) {
    countElement.textContent = cart.length;
  }
}

export function getLocalStorageItemIndex(array, attr, value) {
  let i = array.length;
  let indexNumber = 0;
  while (i--) {
    if (
      array[i] &&
      array[i].hasOwnProperty(attr) &&
      arguments.length > 2 &&
      array[i][attr] === value
    ) {
      indexNumber = i;
    }
  }
  return indexNumber;
}

export function capitalizeFirstLetter(text) {
  return String(text).charAt(0).toUpperCase() + String(text).slice(1);
}

export function productIsInArray(productId, array) {
  return array.some((item) => item.Id == productId);
}

export function findProductIndexInArrayById(productId, array) {
  return array.findIndex((item) => item.Id == productId);
}

export function removeLocalStorageKey(key) {
  localStorage.removeItem(key);
}

export function getResponsiveImage(product) {
  const width = window.innerWidth;
  let images = product.Images;
  if (width < 600 && images?.PrimarySmall) return images.PrimarySmall;
  if (width < 800 && images?.PrimaryMedium) return images.PrimaryMedium;
  if (width < 1440 && images?.PrimaryLarge) return images.PrimaryLarge;
  return images?.PrimaryExtraLarge || product.PrimaryExtraLarge;
}

export function alertMessage(message, scroll = true) {
  const main = document.querySelector("main");
  const alert = document.createElement("div");
  alert.classList.add("alert-box");
  alert.innerHTML = `<p>${message}</p>`;
  main.prepend(alert);

  if (scroll) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  setTimeout(() => {
    alert.remove();
  }, 5000);
}

export function showAddedToCartMessage(productName) {
  alertMessage(`✅ ${productName} has been added to your cart!`);
}
// ✅ New function to show "added to cart" message