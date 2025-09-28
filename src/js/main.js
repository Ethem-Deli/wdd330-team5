import Alert from "./Alert.js";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import Cart from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();

  const alert = new Alert();
  alert.init();

  const pathname = window.location.pathname;

  // Cart page
  if (pathname.includes("cart")) {
    const listElement = document.querySelector(".product-list");
    if (listElement) {
      const cart = new Cart("so-cart", listElement);
      cart.init();
    }
  }

  // Category pages
  if (
    pathname.includes("tents") ||
    pathname.includes("sleeping-bags") ||
    pathname.includes("hammocks")
  ) {
    const category = pathname.split("/").slice(-2, -1)[0]; 
    const dataSource = new ProductData(category);
    const listElement = document.querySelector(".product-list");

    if (listElement) {
      const productList = new ProductList(category, dataSource, listElement);
      productList.init();
    }
  }

  // Product detail pages
  if (pathname.includes("product_pages")) {
    const { default: ProductDetails } = await import("./ProductDetails.mjs");
    const ProductDataModule = (await import("./ProductData.mjs")).default;

    const productId = new URLSearchParams(window.location.search).get("product");

    if (productId) {
      const dataSource = new ProductDataModule("tents"); 
      const productDetails = new ProductDetails(productId, dataSource);
      productDetails.init();
    }
  }
});
