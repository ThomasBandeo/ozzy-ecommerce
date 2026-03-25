document.addEventListener("DOMContentLoaded", () => {
  const order = JSON.parse(localStorage.getItem("lastOrder"));

  if (!order) {
    window.location.href = "index.html";
    return;
  }

  const orderId = document.querySelector(".order-id");
  const orderDate = document.querySelector(".order-date");
  const orderTotal = document.querySelector(".order-total");
  const continueBtn = document.querySelector(".continue-shopping");

  if (orderId) orderId.textContent = order.id;
  if (orderDate) orderDate.textContent = order.date;
  if (orderTotal) orderTotal.textContent = order.total;

  localStorage.removeItem("lastOrder");

  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
});