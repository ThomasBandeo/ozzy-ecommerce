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

  overlay.classList.add("active");

  if (cart.length === 0) {
    itemsContainer.innerHTML = '<p class="emptyCart">El carrito está vacío </p>';
    totalPrice.textContent = "$0";
    cartTotal.classList.add("hidden");
    closeBtn.addEventListener("click", closeCart);
    return;
  }
  
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

          <div class="cart-item-qty">
            <button class="cart-item-qty-left" data-id="${item.id}" data-size="${item.size}">-</button>
            <span> ${item.quantity} </span>
           <button class="cart-item-qty-right" data-id="${item.id}" data-size="${item.size}">+</button>
          </div>
        </div>

        <div class="cart-item-price">
            <button class="cart-item-remove" data-id="${item.id}" data-size="${item.size}">🗑</button>
            <p>$${item.price * item.quantity}</p>
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

  //if (!itemsContainer) return;

  itemsContainer.addEventListener("click", (e) => {
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


export function incrementarCantidad(productId,size) {
  const cart = getCart();

  const product = cart.find(item =>
    item.id == productId && item.size === size
  );

  if (!product) return;

  product.quantity += 1;
 
  localStorage.setItem("cart", JSON.stringify(cart));

  if (document.querySelector(".checkout-page")) {
    renderCheckout();
  } else {
    renderCart();
  }

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
  if (document.querySelector(".checkout-page")) {
    renderCheckout();
  } else {
    renderCart();
  }
  updateCartQuantityUI();
}

export function eliminarProducto(productId,size) {
  let cart = getCart();

  cart = cart.filter(item =>
    !(item.id == productId && item.size === size)
  );
  
  localStorage.setItem("cart", JSON.stringify(cart));
  if (document.querySelector(".checkout-page")) {
    renderCheckout();
  } else {
    renderCart();
  }
  updateCartQuantityUI();
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