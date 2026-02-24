import { renderCheckout } from "./checkout.js";

export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

export function addToCart(product) {
  const cart = getCart();

  const existingProduct = cart.find(item =>
    item.id === product.id &&
    item.size === product.size
  );

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

export function closeCart() {
  const overlay = document.querySelector(".cart-overlay");
  overlay.classList.remove("active");
}

export function renderCart() {
  const cart = getCart();

  const overlay = document.querySelector(".cart-overlay");
  const itemsContainer = document.querySelector(".cart-items");
  const closeBtn = overlay.querySelector(".cart-close");
  const totalPrice = overlay.querySelector(".cart-total-price");
  const cartTotal = overlay.querySelector(".cart-total");
  const cartEmpty = document.querySelector(".cart-empty ");


  overlay.classList.add("active");

  if (cart.length === 0) {
    cartEmpty.classList.remove("hidden");
    itemsContainer.classList.add("hidden");
    cartTotal.classList.add("hidden");

    totalPrice.textContent = "$0";
    closeBtn.addEventListener("click", closeCart);
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
            <button class="cart-item-qty-left" data-id="${item.id}" data-size="${item.size}">-</button>
            <span> ${item.quantity} </span>
            <button class="cart-item-qty-right" data-id="${item.id}" data-size="${item.size}">+</button>
          </div>
            
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

  itemsContainer.innerHTML = html;

  totalPrice.textContent = "$" + calcularTotalPrice().toLocaleString("es-AR");

  closeBtn.addEventListener("click", closeCart);

}

export function initCartEvents() {
  const itemsContainer = document.querySelector(".cart-items");

  if (!itemsContainer) return;

  itemsContainer.addEventListener("click", (e) => {

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


export function incrementarCantidad(productId,size) {
  const cart = getCart();

  const product = cart.find(item =>
    item.id == productId && item.size === size
  );

  if (!product) return;

  product.quantity += 1;
 
  localStorage.setItem("cart", JSON.stringify(cart));

  refreshUI();
  updateCartQuantityUI();
}

export function disminuirCantidad(productId,size) {
  const cart = getCart();

  const product = cart.find(item =>
    item.id == productId && item.size === size
  );

  if (!product) return;

  product.quantity -= 1;

  if (product.quantity <= 0) {
    eliminarProducto(productId, size);
    return;
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  refreshUI();
  updateCartQuantityUI();
}

export function eliminarProducto(productId,size) {
  let cart = getCart();

  cart = cart.filter(item =>
    !(item.id == productId && item.size === size)
  );
  
  localStorage.setItem("cart", JSON.stringify(cart));
  
  refreshUI();
  updateCartQuantityUI();
}


function refreshUI() {
  if (document.querySelector(".checkout-page")) {
    renderCheckout();
  } else {
    renderCart();
  }
}


function calcularTotalPrice() {
  const cart = getCart();

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
  });

  return total;
}

export function calcularCantidadTotal() {
  const cart = getCart();

  let total = 0;

  cart.forEach(item => {
    total += item.quantity;
  });

  return total;
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


export function ensureCartNotEmpty() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("No hay productos en el carrito");
    window.location.href = "index.html";
    return false;
  }

  return true;
}

const cartContainer = document.querySelector(".cart");
  if (cartContainer) {
    cartContainer.addEventListener("click", e => {
      const btn = e.target.closest(".view-btn");
      if (!btn) return;

      window.location.href = "index.html#sale";
      closeCart();
  });
}