import { capitalizeFirstLetter, getResponsiveImage, renderListWithTemplate } from "./utils.mjs";

// Template for individual product cards
function productCardTemplate(product) {
  const isDiscounted =
    product.FinalPrice < (product.SuggestedRetailPrice || product.FinalPrice);

  return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
      <img src="${getResponsiveImage(product)}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand?.Name || ""}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">
        $${product.FinalPrice}
        ${isDiscounted ? `<span class="discount-flag">Discount!</span>` : ""}
      </p>
    </a>
  </li>`;
}
// Main class to handle product listing
export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
// Initialize and fetch data
  async init() {
    try {
      const list = await this.dataSource.getData(this.category);
      this.renderList(list);
      // Update the page title based on the category
      const titleElement = document.querySelector(".title");
      if (titleElement) {
        titleElement.textContent = capitalizeFirstLetter(this.category);
      }
    } catch (err) {
      console.error("Error initializing ProductList:", err);
    }
  }
// Render the product list using the template
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
