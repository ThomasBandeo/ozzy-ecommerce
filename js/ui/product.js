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

  document.getElementById("mainImage").src = product.image;
  document.getElementById("mainImage").alt = product.title;
  document.getElementById("category").textContent = product.category;
  document.getElementById("title").textContent = product.title;
  document.getElementById("price").textContent =
    `$${product.price.toLocaleString()}`;
}

function initSizeSelector() {
  const sizeButtons = document.querySelectorAll(".size-btn");
  addBtn = document.querySelector(".add-cart-btn");

  addBtn.disabled = true;

  sizeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      sizeButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

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
    
    addBtn.textContent = "Agregado ✓";
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


initHeader();
initProductPage();
initCartEvents();


document.addEventListener("click", e => {
  if (e.target.classList.contains("btn-buys")) {
    window.location.href = `checkout.html`;
  }
});