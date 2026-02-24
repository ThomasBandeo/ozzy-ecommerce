import { ensureCartNotEmpty } from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {
  if (!ensureCartNotEmpty()) return;

  const form = document.querySelector(".login-form");
  const backBtn = document.querySelector(".continue-shopping");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.querySelector("#email").value;

      localStorage.setItem("user", JSON.stringify({
        email,
        type: "member"
      }));

      window.location.href = "checkout.html";
    });
  }

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "checkout.html";
    });
  }
});
