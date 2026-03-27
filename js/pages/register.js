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

      const passwordError = document.getElementById("passwordError");
      const confirmError = document.getElementById("confirmPasswordError");

      passwordError.textContent = "";
      confirmError.textContent = "";

      if (password.length < 6) {
        passwordError.textContent = "Mínimo 6 caracteres";
        return;
      }

      if (password !== confirmPassword) {
        confirmError.textContent = "Las contraseñas no coinciden";
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