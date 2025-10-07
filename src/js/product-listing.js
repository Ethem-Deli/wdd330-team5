import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// Load header and footer templates, and update cart count
loadHeaderFooter();

// get category from URL parameter
const category = getParam("category");

// Initialize product data and create a data source for tents (points to tents.json)
const dataSource = new ProductData();

// Find the <ul class="product-list"> element in your index.html
const listElement = document.querySelector(".product-list");

// Create an instance of ProductList
// parameter order: (category, dataSource, listElement)
const myList = new ProductList(category, dataSource, listElement);

// Initialize it (this will fetch JSON + render products)
myList.init();
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ExternalServices();
const listElement = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, listElement);
productList.init();
