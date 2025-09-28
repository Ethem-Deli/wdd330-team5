import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

function displayError(message) {
  const container = document.querySelector(".checkout-form"); 
  if (!container) return;

  const errorBox = document.createElement("div");
  errorBox.classList.add("error-message");
  errorBox.innerHTML = `
    ${message}
    <span class="close-btn">&times;</span>
  `;

  // Allow closing
  errorBox.querySelector(".close-btn").addEventListener("click", () => {
    errorBox.remove();
  });

  container.prepend(errorBox);
}

const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();

document
  .querySelector("#zip")
  .addEventListener("blur", order.calculateOrderTotal.bind(order));

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  const myForm = document.forms[0];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();

  if (chk_status) {
    order.checkout();
  } else {
    // ✅ Now displayError is actually used
    displayError("Please fix the errors in the form before submitting.");
  }
});
