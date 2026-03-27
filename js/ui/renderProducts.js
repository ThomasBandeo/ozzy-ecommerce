import { products } from "../data/products.js";

export function renderProducts(container, category = null) {

  let filteredProducts = products;

  // si viene una categoría, filtramos
  if (category) {
    filteredProducts = products.filter(p => p.category === category);
  }

  let html = "";

  filteredProducts.forEach(product => {
    const price = new Intl.NumberFormat("es-AR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(product.price);

    html += `
      <article class="product-card" data-id="${product.id}">
        <div class="product-image">
          <img loading="lazy" src="${product.mainImage}" alt="${product.title}">
        </div>
        <div class="product-info">
          <h4>${product.title}</h4>
          ${product.badge ? `<p class="badge">${product.badge}</p>` : ""}
          <span class="price">$${price}</span>
        </div>
      </article>
    `;
  });

  container.innerHTML = html;
}


export function initProductGridEvents(container) {

  container.addEventListener("click", e => {
    const card = e.target.closest(".product-card");
    if (!card) return;

    const id = card.dataset.id;
    window.location.href = `/product.html?id=${id}`;
  });

}