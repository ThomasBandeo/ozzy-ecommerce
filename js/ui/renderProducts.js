import { products } from "../data/products.js";

export function renderProducts(containerId) {
  const container = document.getElementById(containerId);

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
          <button class="view-btn" data-id="${product.id}">
            Ver Producto
          </button>
        </div>
      </article>
    `;
  });

  container.innerHTML = html;
}


document.addEventListener("click", e => {
  if (e.target.classList.contains("view-btn")) {
    const id = e.target.dataset.id;
    window.location.href = `product.html?id=${id}`;
  }
});