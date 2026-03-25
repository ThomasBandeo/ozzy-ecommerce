document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector(".register-form");
  const backBtn = document.querySelector(".continue-shopping");

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const formData = new FormData(form);

      const name = formData.get("name");
      const lastname = formData.get("lastname");
      const email = formData.get("email");
      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");

      if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres");
        return;
      }

      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      // Guardamos el usuario en localStorage para simular el registro
      localStorage.setItem("user", JSON.stringify({
        name,
        lastname,
        email,
        type: "member"
      }));

      window.location.href = "login.html";
    });
  }

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "checkout-page.html";
    });
  }

});