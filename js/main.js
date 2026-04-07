import { renderProducts, initProductGridEvents } from "./ui/renderProducts.js";
import { initHeader } from "./ui/header.js";
import { initCartEvents } from "./ui/cart.js";
import { renderLayout } from "./layout/layout.js";

async function initHomePage() {

  renderLayout({
    showFooter: true,
    showBenefits: true
  });

  initHeader();

  const productsGrid = document.getElementById("productsGrid");

  if (productsGrid) {
    await renderProducts(productsGrid, "sale");
    initProductGridEvents(productsGrid);
  }

  initCartEvents();
}

document.addEventListener("DOMContentLoaded", initHomePage);