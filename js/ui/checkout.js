import { getCart } from "./cart.js";
import { incrementarCantidad } from "./cart.js";
import { disminuirCantidad } from "./cart.js";
import { eliminarProducto } from "./cart.js";

export function renderCheckout() {
  const cart = getCart();
  const tbody = document.querySelector(".tbody");
  const subtotal = calcularTotales(cart);
  const envio = calcularEnvio(subtotal);
  const actions = document.querySelector(".summary-actions");

  if (cart.length === 0) {
    actions.classList.add("disabled");

    tbody.innerHTML = `
      <tr>
        <td colspan="6">Tu carrito está vacío</td>
      </tr>
    `;

    actualizarResumen(0,0);
    return;
  }

  actions.classList.remove("disabled");

  let html = "";

  cart.forEach(item => {
    html += `
      <tr class="cart-row">
        <td class="checkout-image" data-label="Producto">
          <img src="${item.image}" alt="${item.title}">
        </td>

        <td data-label="Descripción">
          ${item.title}
        </td>

        <td data-label="Precio">
          $${item.price}
        </td>

        <td data-label="Cantidad">
          <div class="cart-item-qty">
            <button 
              class="cart-item-qty-left" 
              data-id="${item.id}" 
              data-size="${item.size}">
              −
            </button>

            <span>${item.quantity}</span>

            <button 
              class="cart-item-qty-right" 
              data-id="${item.id}" 
              data-size="${item.size}">
              +
            </button>
          </div>
        </td>

        <td data-label="Subtotal">
          $${item.price * item.quantity}
        </td>

        <td data-label="Eliminar">
          <button 
            class="cart-item-remove" 
            data-id="${item.id}" 
            data-size="${item.size}">
            🗑
          </button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;

  actualizarResumen(subtotal,envio);
}


export function initCheckoutEvents() {
  const tbody = document.querySelector(".tbody");
  if (!tbody) return;

  tbody.addEventListener("click", (e) => {
    const productId = e.target.dataset.id;
    const size = e.target.dataset.size;

    if (e.target.classList.contains("cart-item-qty-right")) {
      incrementarCantidad(productId, size);
    }

    if (e.target.classList.contains("cart-item-qty-left")) {
      disminuirCantidad(productId, size);
    }

    if (e.target.classList.contains("cart-item-remove")) {
      eliminarProducto(productId, size);
    }
  });
}


function calcularTotales(cart) {
  return cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
}

function calcularEnvio(subtotal) {
  if (subtotal >= 100000) {
    return 0; // envío gratis
  }
  return 2000;
}

function actualizarResumen(subtotal, envio) {
  const total = subtotal + envio;

  document.querySelector(".subtotal-price").textContent = `$${subtotal}`;
  document.querySelector(".shipping-price").textContent =
    envio === 0 ? "Gratis" : `$${envio}`;
  document.querySelector(".total-price").textContent = `$${total}`;
}


function initShippingCalculator() {
  const btn = document.querySelector(".shipping-btn");
  const input = document.querySelector(".shipping-zip");

  if (!btn || !input) return;

  btn.addEventListener("click", () => {
    const cart = getCart();
    const subtotal = calcularTotales(cart);
    const cp = input.value.trim();

    const envio = calcularEnvioPorCP(cp, subtotal);

    if (envio === null) {
      alert("Ingresá un código postal válido");
      return;
    }

    actualizarResumen(subtotal, envio);
  });
}

function calcularEnvioPorCP(cp, subtotal) {
  if (subtotal >= 100000) return 0;

  if (!cp || cp.length < 4) return null;

  const zona = cp[0];

  if (zona === "1") return 4000;
  if (zona === "2" || zona === "3") return 6000;

  return 10000;
}


function handleLoggedUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  const memberBtn = document.querySelector(".btn-member");
  const guestBtn = document.querySelector(".btn-secondary");

  // Cambiar texto del botón
  memberBtn.textContent = `Continuar como ${user.email}`;

  // Ocultar invitado
  guestBtn.style.display = "none";

  // Mensaje visual
  const summary = document.querySelector(".summary-box");
  const info = document.createElement("p");
  info.classList.add("logged-info");
  info.textContent = "🟢 Estás comprando como miembro";

  summary.prepend(info);
}


document.addEventListener("click", e => {
  if (e.target.classList.contains("continue-shopping")) {
    window.location.href = `index.html`;
  }

  if (e.target.classList.contains("btn-member")) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      // Ya está logueado → finalizar compra
      alert("Compra realizada con éxito 🎉");
      localStorage.removeItem("cart");
      window.location.href = "index.html";
    } else {
      // No logueado → login
      window.location.href = "login.html";
    }
  }

  if (e.target.classList.contains("btn-secondary")) {
    // comprar como invitado
    window.location.href = "checkout-guest.html";
  }

});


document.addEventListener("DOMContentLoaded", () => {
  renderCheckout();
  initCheckoutEvents();
  initShippingCalculator();
  handleLoggedUser(); 
});
