import { 
  getLocalStorage, 
  setLocalStorage, 
  productIsInArray, 
  findProductIndexInArrayById, 
  getResponsiveImage, 
  showAddedToCartMessage   // 👈 import new function
} from "./utils.mjs";

export default class ProductDetails {

    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);

        this.renderProductDetails();

        document
            .getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        const productId = this.product.Id;

        if (cartItems.length !== 0 && productIsInArray(productId, cartItems)) {
            const itemIndex = findProductIndexInArrayById(productId, cartItems);
            cartItems[itemIndex].Quantity++;
            setLocalStorage("so-cart", cartItems);
        } else {
            this.product.Quantity = 1;
            cartItems.push(this.product);
            setLocalStorage("so-cart", cartItems);
        }

        // ✅ Show alert message after product is added
        showAddedToCartMessage(this.product.Name);
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
    const discountAmount = product.SuggestedRetailPrice - product.FinalPrice;
    const isDiscounted = discountAmount > 0;

    // Update ribbon text and visibility
    const ribbonElement = document.getElementById('discountRibbon');
    if (isDiscounted) {
        ribbonElement.textContent = `SAVE $${discountAmount.toFixed(2)}!`;
        
        ribbonElement.style.display = 'block';
    } else {
        ribbonElement.style.display = 'none';
    }

    // Existing code to update product details
    document.querySelector('h2').textContent = product.Brand.Name;
    document.querySelector('h3').textContent = product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    productImage.src = getResponsiveImage(product);
    productImage.alt = product.NameWithoutBrand;

    document.getElementById('productFinalPrice').textContent = `$${product.FinalPrice}`;
    document.getElementById('productPrice').textContent = `$${product.SuggestedRetailPrice}`;

    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;
    document.getElementById('addToCart').dataset.id = product.Id;
}