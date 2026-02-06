import { renderProducts } from "./ui/renderProducts.js";
import { initHeader } from "./ui/header.js";
import { initCartEvents } from "./ui/cart.js";

document.addEventListener("DOMContentLoaded", () => {
  initHeader();

  const productsGrid = document.getElementById("productsGrid");
  if (productsGrid) {
    renderProducts("productsGrid");
  }
  
  initCartEvents();

});


document.addEventListener("click", e => {
  if (e.target.classList.contains("btn-buys")) {
    window.location.href = `checkout.html`;
  }
});