import { ensureCartNotEmpty } from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {
  if (!ensureCartNotEmpty()) return;  

  const form = document.querySelector(".guest-form");
  const backBtn = document.querySelector(".continue-shopping");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      if (cart.length === 0) {
        alert("No hay productos en el carrito");
        return;
      }

      alert("Compra realizada con éxito 🎉");
      localStorage.removeItem("cart");
      window.location.href = "index.html";
    });
  }

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "checkout.html";
    });
  }
});
