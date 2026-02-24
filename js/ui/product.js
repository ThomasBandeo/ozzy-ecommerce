import { initHeader } from "./header.js";
import { products } from "../data/products.js";
import { addToCart } from "./cart.js";
import { initCartEvents } from "./cart.js";
import { updateCartQuantityUI } from "./cart.js";

/* ESTADO GLOBAL DEL PRODUCTO */
let selectedSize = null;
let addBtn;
let currentProduct = null; 

function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const product = products.find(p => p.id == id);
  if (!product) return;

  currentProduct = product; // guardamos el producto

  const mainImage = document.getElementById("mainImage");
  const thumbnailsContainer = document.getElementById("thumbnails");

  // Imagen principal
  mainImage.src = product.images?.[0] || product.image;
  mainImage.alt = product.title;

  document.getElementById("mainImage").src = product.image;
  document.getElementById("mainImage").alt = product.title;
  document.getElementById("title").textContent = product.title;
  document.getElementById("category").textContent = product.category;
  document.getElementById("price").textContent =
    `$${product.price.toLocaleString()}`;


  // Miniaturas
  if (!thumbnailsContainer || !product.images) return;

  thumbnailsContainer.innerHTML = "";

  product.images.forEach((img, index) => {
    const thumb = document.createElement("img");
    thumb.src = img;
    thumb.className = "thumbnail";

    if (index === 0) thumb.classList.add("active");

    thumb.addEventListener("click", () => {
      mainImage.src = img;

      document.querySelectorAll(".thumbnail").forEach(t => {
        t.classList.remove("active");
      });

      thumb.classList.add("active");

      thumb.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest"
      });
    });

    thumbnailsContainer.appendChild(thumb);
  }); 
}

function initSizeSelector() {
  const sizeButtons = document.querySelectorAll(".size-btn");
  addBtn = document.querySelector(".add-cart-btn");

  addBtn.disabled = true;

  sizeButtons.forEach(btn => {
  btn.setAttribute("aria-pressed", "false");

  btn.addEventListener("click", () => {
    sizeButtons.forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });

    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");
    selectedSize = btn.textContent;
    addBtn.disabled = false;
  });
});  

}

function initAddToCart() {
  addBtn.addEventListener("click", () => {
    if (!selectedSize) return;

    addToCart({
      id: currentProduct.id,
      title: currentProduct.title,
      price: currentProduct.price,
      size: selectedSize,
      image: currentProduct.image,
      quantity: 1
    });
    
    addBtn.textContent = "Agregado al carrito ✓";
    addBtn.classList.add("added");
    addBtn.disabled = true;

    updateCartQuantityUI();
    setTimeout(() => {
      addBtn.textContent = "Agregar al carrito";
      addBtn.classList.remove("added");
      addBtn.disabled = false;
    }, 2000);
  });
}

function initProductPage() {
  loadProduct();
  initSizeSelector();
  initAddToCart();
}

function initPage() {
  initHeader();
  initProductPage();
  initCartEvents();
  initCheckoutRedirect();
  initSizeGuideModal(); // 👈 acá
}

function initCheckoutRedirect() {
  const cartContainer = document.querySelector(".cart");
  if (!cartContainer) return;

  cartContainer.addEventListener("click", e => {
    const checkoutBtn = e.target.closest(".btn-buys");
    if (!checkoutBtn) return;

    window.location.href = "checkout.html";
  });
}


function initSizeGuideModal() {
  const openBtn = document.querySelector(".size-guide-link");
  const modal = document.getElementById("sizeGuideModal");
  const closeBtn = document.getElementById("closeSizeGuide");

  if (!openBtn || !modal || !closeBtn) return;

  openBtn.addEventListener("click", () => {
    modal.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  // Cerrar con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.remove("active");
    }
  });
}



initPage();