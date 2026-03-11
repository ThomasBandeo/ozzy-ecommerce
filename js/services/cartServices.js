export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

export function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
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

  saveCart(cart);
}

export function eliminarProducto(productId, size) {
  let cart = getCart();

  cart = cart.filter(item =>
    !(item.id == productId && item.size === size)
  );

  saveCart(cart);
}

export function incrementarCantidad(productId, size) {
  const cart = getCart();

  const product = cart.find(item =>
    item.id == productId && item.size === size
  );

  if (!product) return;

  product.quantity += 1;

  saveCart(cart);
}


export function disminuirCantidad(productId, size) {
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

  saveCart(cart);
}

export function calcularTotalPrice() {
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



