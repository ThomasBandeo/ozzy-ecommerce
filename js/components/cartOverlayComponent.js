export function cartOverlayComponent() {
  return `
    <div class="cart-overlay">
      <div class="cart">
          <h2>mi compra</h2>
          <button class="cart-close" aria-label="Cerrar carrito"> </button>
          <div class="cart-items">
            <!-- Las cart para el carrito se generan por JS -->
          </div>

          <div class="cart-empty hidden">
            <p>El carrito está vacío</p>
            <button class="btn view-btn">Ver productos</button>
          </div>

          <div class="cart-total">
            <div>
              <h3> total </h3>
              <p class="cart-total-price"></p>
            </div>
            
            <button class="btn btn-primary btn-buys"> Finalizar compra</button>
          </div>

      </div>
  </div>
  `;
}