import { getCart } from "./cart.js";
import { incrementarCantidad } from "./cart.js";
import { disminuirCantidad } from "./cart.js";
import { eliminarProducto } from "./cart.js";

export function renderCheckout() {
  const container = document.querySelector(".section-cart");
  const actions = document.querySelector(".summary-actions");

  if (!container || !actions) return;

  const cart = getCart();
  const subtotal = calcularTotales(cart);
  const envio = calcularEnvio(subtotal);
  

  if (cart.length === 0) {
    actions.classList.add("disabled");

    container.innerHTML = `
      <div class="empty-checkout">
        Tu carrito está vacío
      </div>
    `;
    actualizarResumen(0,0);
    return;
  }

  actions.classList.remove("disabled");

  let html = "";

  cart.forEach(item => {
    html += `

      <div class="cart-item-checkout checkout-grid">

      <div class="cart-col product-col">
        <img src="${item.image}" alt="${item.title}">
        <div class="product-info">
          <p class="product-title">${item.title}</p>
          <p class="product-variant">
            Talle: ${item.size}
          </p>
        </div>
      </div>

      <div class="cart-col price-col">
        $${item.price.toLocaleString("es-AR")}
      </div>

      <div class="cart-item-qty">
        <button class="cart-item-qty-left" data-id="${item.id}" data-size="${item.size}">-</button>
        <span> ${item.quantity} </span>
        <button class="cart-item-qty-right" data-id="${item.id}" data-size="${item.size}">+</button>
      </div>

      <div class="cart-col subtotal-col">
        $${(item.price * item.quantity).toLocaleString("es-AR")}
      </div>

      <div class="cart-col remove-col">
        <button class="cart-item-remove" data-id="${item.id}" data-size="${item.size}">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="1.5" 
            stroke-linecap="round" 
            stroke-linejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
            <path d="M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14" />
            <line x1="10" y1="11" x2="10" y2="18" />
            <line x1="14" y1="11" x2="14" y2="18" />
          </svg>
        </button>   
      </div>

    </div>
  `;
  });

  container.innerHTML = html;

  actualizarResumen(subtotal,envio);
}


export function initCheckoutEvents() {
  const container = document.querySelector(".section-cart");
  if (!container) return;

  container.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const { id, size } = btn.dataset;

   if (btn.classList.contains("cart-item-qty-right")) {
      incrementarCantidad(id, size);
    }

    if (btn.classList.contains("cart-item-qty-left")) {
      disminuirCantidad(id, size);
    }

    if (btn.classList.contains("cart-item-remove")) {
      eliminarProducto(id, size);
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

  document.querySelector(".subtotal-price").textContent =`$${subtotal.toLocaleString("es-AR")}`;
  document.querySelector(".shipping-price").textContent =
    envio === 0 ? "Gratis" : `$${envio}`;
  document.querySelector(".total-price").textContent = `$${total.toLocaleString("es-AR")}`;
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
  const guestBtn = document.querySelector(".btn-guest");

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


function initCheckoutActions() {
  const actions = document.querySelector(".summary-actions");
  if (!actions) return;

  actions.addEventListener("click", (e) => {
    if (e.target.classList.contains("continue-shopping")) {
      window.location.href = "index.html";
    }

    if (e.target.classList.contains("btn-member")) {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        alert("Compra realizada con éxito 🎉");
        localStorage.removeItem("cart");
        window.location.href = "index.html";
      } else {
        window.location.href = "login.html";
      }
    }

    if (e.target.classList.contains("btn-guest")) {
      window.location.href = "checkout-guest.html";
    }
  });
}


document.addEventListener("DOMContentLoaded", () => {
  if (!document.querySelector(".checkout-page")) return;
  
  renderCheckout();
  initCheckoutEvents();
  initShippingCalculator();
  handleLoggedUser(); 
  initCheckoutActions();
});
