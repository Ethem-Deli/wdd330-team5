// wrapper for querySelector...returns the first matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// LocalStorage Helpers
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function removeLocalStorageKey(key) {
  localStorage.removeItem(key);
}

// Event Listener Helpers
export function setClick(selector, callback) {
  const el = qs(selector);
  if (!el) {
    console.warn(`setClick: selector ${selector} not found`);
    return;
  }
  el.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  el.addEventListener("click", callback);
}

// URL Parameter Helper
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Rendering Helpers

// -------------------------

// render a list of items using a template function
// inserts all items into a parentElement at a chosen position
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  clear ? parentElement.innerHTML = "" : 0;
  const htmlStrings = list?.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement?.insertAdjacentHTML(position, htmlStrings?.join(""));

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
  if (!parentElement) {
    console.warn("renderWithTemplate: parentElement not found");
    return;
  }
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

// Template Loader
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// Header & Footer Loader
export async function loadHeaderFooter() {
  const header = document.querySelector("#main-header");
  const footer = document.querySelector("#main-footer");

  const headerContent = await loadTemplate("../partials/header.html");
  const footerContent = await loadTemplate("../partials/footer.html");

  renderWithTemplate(headerContent, header);
  renderWithTemplate(footerContent, footer);

  updateCartCount();
}

// update cart count shown in header (based on items in localStorage)
function updateCartCount() {
  const countElement = document.querySelector(".cart-count");
  const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  if (countElement) {
    countElement.textContent = cart.length;
  }
}

// Array Helpers
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

// Image Helpers
export function getResponsiveImage(product) {
  const width = window.innerWidth;

  function fixPath(path) {
    if (!path) return "";
    return path.replace(/^\.\.\//, "/");
  }

  const images = product.Images || {};

  if (width < 600 && images?.PrimarySmall) {
    return fixPath(images.PrimarySmall);
  }
  if (width < 800 && images?.PrimaryMedium) {
    return fixPath(images.PrimaryMedium);
  }
  if (width < 1440 && images?.PrimaryLarge) {
    return fixPath(images.PrimaryLarge);
  }
  return fixPath(
    images?.PrimaryExtraLarge || product.PrimaryExtraLarge || product.Image
  );
}
