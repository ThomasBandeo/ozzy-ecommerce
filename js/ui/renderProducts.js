import { products } from "../data/products.js";

export function renderProducts(container) {

  let html = "";

  products.forEach(product => {
    html += `
      <article class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="product-info">
          <h4>${product.title}</h4>
          <p class="category">${product.category}</p>
          <span class="price">$${product.price.toLocaleString()}</span>
          <button class="btn view-btn" data-id="${product.id}">
            Ver Producto
          </button>
        </div>
      </article>
    `;
  });

  container.innerHTML = html;

}

const productsGrid = document.getElementById("productsGrid");
// ✅ Listener local y delegado
  productsGrid.addEventListener("click", e => {
    const btn = e.target.closest(".view-btn");
    if (!btn) return;

    const id = btn.dataset.id;
    window.location.href = `product.html?id=${id}`;
  });