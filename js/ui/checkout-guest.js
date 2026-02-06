document.querySelector(".guest-form").addEventListener("submit", e => {
    e.preventDefault();

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("No hay productos en el carrito");
        return;
    }

    alert("Compra realizada con éxito 🎉");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
});

document.querySelector(".continue-shopping").addEventListener("click", () => {
    window.location.href = "checkout.html";
});