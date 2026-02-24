import { renderProducts } from "./ui/renderProducts.js";
import { initHeader } from "./ui/header.js";
import { initCartEvents } from "./ui/cart.js";

document.addEventListener("DOMContentLoaded", () => {
  initHeader();

  const productsGrid = document.getElementById("productsGrid");
  if (productsGrid) {
    renderProducts(productsGrid);
  }
  
  initCartEvents();


  const cartContainer = document.querySelector(".cart");
  if (cartContainer) {
    cartContainer.addEventListener("click", e => {
      const checkoutBtn = e.target.closest(".btn-buys");
      if (!checkoutBtn) return;

      window.location.href = "checkout.html";
    });
  }

});

