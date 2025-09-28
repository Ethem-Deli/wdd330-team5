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

  // Category/product-listing page
  if (pathname.includes("product_listing")) {
    const params = new URLSearchParams(window.location.search);
    // get category from ?category= OR default to tents
    const category = params.get("category") || "tents";

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

    const params = new URLSearchParams(window.location.search);
    const productId = params.get("product");
    const category = params.get("category") || "tents";

    if (productId) {
      const dataSource = new ProductDataModule(category);
      const productDetails = new ProductDetails(productId, dataSource);
      productDetails.init();
    }
  }
});
