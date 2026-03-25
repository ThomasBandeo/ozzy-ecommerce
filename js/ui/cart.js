import {
  getCart,
  incrementarCantidad,
  disminuirCantidad,
  eliminarProducto,
  calcularCantidadTotal,
  calcularTotalPrice
} from "../services/cartServices.js";

export function renderCart() {
  const cart = getCart();

  const overlay = document.querySelector(".cart-overlay");
  if (!overlay) return;
  const itemsContainer = document.querySelector(".cart-items");
  if (!itemsContainer) return;

  const totalPrice = overlay.querySelector(".cart-total-price");
  const cartTotal = overlay.querySelector(".cart-total");
  const cartEmpty = document.querySelector(".cart-empty");

  if (cart.length === 0) {
    cartEmpty.classList.remove("hidden");
    itemsContainer.classList.add("hidden");
    cartTotal.classList.add("hidden");
    totalPrice.textContent = "$0";
    return;
  }

  cartEmpty.classList.add("hidden");
  itemsContainer.classList.remove("hidden");
  cartTotal.classList.remove("hidden");

  let html = "";

  cart.forEach(item => {
    html += `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.title}">
        </div>

        <div class="cart-item-info">
          <p class="cart-item-title">${item.title}</p>
          <p class="cart-item-size">Talle: ${item.size}</p>
          <p class="cart-item-subtotal">
            $${(item.price * item.quantity).toLocaleString("es-AR")}
          </p>
        </div>

        <div class="cart-item-price">
          <div class="cart-item-qty">
            <button 
              class="cart-item-qty-left" 
              aria-label="Disminuir cantidad"
              data-id="${item.id}" 
              data-size="${item.size}">
              -
            </button>

            <span aria-live="polite">${item.quantity}</span>

            <button 
              class="cart-item-qty-right" 
              aria-label="Aumentar cantidad"
              data-id="${item.id}" 
              data-size="${item.size}">
              +
            </button>
          </div>
            
          <button class="cart-item-remove" aria-label="Eliminar producto" data-id="${item.id}" data-size="${item.size}">
            <svg aria-hidden="true"
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

  itemsContainer.innerHTML = html;

  totalPrice.textContent = "$" + calcularTotalPrice().toLocaleString("es-AR");
}

export function initCartEvents() {
  const itemsContainer = document.querySelector(".cart-items");

  if (itemsContainer) {
    itemsContainer.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;

      const { size } = btn.dataset;
      const id = Number(btn.dataset.id);
      let updated = false;

      if (btn.classList.contains("cart-item-qty-right")) {
        incrementarCantidad(id, size);
        updated = true;
      }

      if (btn.classList.contains("cart-item-qty-left")) {
        disminuirCantidad(id, size);
        updated = true;
      }

      if (btn.classList.contains("cart-item-remove")) {
        eliminarProducto(id, size);
        updated = true;
      }

      if (updated) {
        updateCartQuantityUI();
        renderCart();
      }
    });
  }

  // Nuevo listener, pero separado
  const cartContainer = document.querySelector(".cart");
  if (cartContainer) {
    cartContainer.addEventListener("click", e => {

      // Botón finalizar compra
      const checkoutBtn = e.target.closest(".btn-buys");
      if (checkoutBtn) {
        closeCart();
        window.location.href = "checkout-page.html";
        return;
      }

      // Botón ver productos cuando está vacío
      const viewBtn = e.target.closest(".view-btn");
      if (viewBtn) {
        closeCart();
        window.location.href = "index.html#sale";
        return;
      }

    });
  }
}

export function updateCartQuantityUI() {
  const quantityEl = document.querySelector(".quantity-products");
  if (!quantityEl) return;

  const total = calcularCantidadTotal();

  if (total === 0) {
    quantityEl.style.display = "none";
  } else {
    quantityEl.style.display = "flex";
    quantityEl.textContent = total;
  }
}

export function closeCart() {
  const cart = document.querySelector(".cart-overlay");
  const overlay = document.querySelector(".overlay");

  if (cart) {
    cart.classList.remove("active");
  }
  if (overlay) {
    overlay.classList.remove("active");
  }
}

export function ensureCartNotEmpty() {
  const cart = getCart();

  if (cart.length === 0) {
    alert("No hay productos en el carrito");
    window.location.href = "index.html";
    return false;
  }

  return true;
}

