import { renderLayout } from "../layout/layout.js";
import { renderProducts , initProductGridEvents} from "../ui/renderProducts.js";
import { initHeader } from "../ui/header.js";
import { initCartEvents } from "../ui/cart.js";

document.addEventListener("DOMContentLoaded", () => {
    renderLayout({
        showFooter: true,
        showBenefits: false
    });
    initHeader();

    const grid = document.getElementById("productsGrid");

    if (grid) {
        renderProducts(grid, "hombre");
        initProductGridEvents(grid);
    }
  
    initCartEvents();
});