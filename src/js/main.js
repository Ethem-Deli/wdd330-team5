
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// Load header and footer templates, and update cart count
loadHeaderFooter();

// Initialize product data and create a data source for tents (points to tents.json)
const dataSource = new ProductData("tents");

// Find the <ul class="product-list"> element in your index.html
const listElement = document.querySelector(".product-list");

// Create an instance of ProductList
// parameter order: (category, dataSource, listElement)
const productList = new ProductList("tents", dataSource, listElement);

// Initialize it (this will fetch JSON + render products)
productList.init();

// Import the utility function to load header and footer
import { loadHeaderFooter } from "./utils.mjs";
import "../css/style.css";

// Load header and footer when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();
});

