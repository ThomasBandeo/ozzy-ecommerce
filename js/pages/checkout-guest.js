import { ensureCartNotEmpty } from "../ui/cart.js";
import { calcularTotalPrice } from "../services/cartServices.js";

document.addEventListener("DOMContentLoaded", () => {

  if (!ensureCartNotEmpty()) return;  

  const form = document.querySelector(".guest-form");
  const backBtn = document.querySelector(".continue-shopping");
  const total = calcularTotalPrice();

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      finalizarCompra(total);
    });
  }

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "checkout-page.html";
    });
  }

  function finalizarCompra(total) {

    // Creamos una orden simulada
    const order = {
      id: "ORD-" + Date.now(),
      date: new Date().toLocaleDateString("es-AR"),
      total: total
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));
    localStorage.removeItem("cart");

    window.location.href = "checkout-success.html";
  }

});
