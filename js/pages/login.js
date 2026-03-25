document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");
  const backBtn = document.querySelector(".continue-shopping");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const email = formData.get("email");
      
      if (!email) {
        alert("Ingresá un email válido");
        return;
      }

      // Guardamos el usuario en localStorage
      localStorage.setItem("user", JSON.stringify({
        email,
        type: "member"
      }));

      // Si el usuario venía del checkout lo redirigimos de vuelta
      const redirectUrl = localStorage.getItem("redirectAfterLogin");

      if (redirectUrl) {
        localStorage.removeItem("redirectAfterLogin");
        window.location.href = redirectUrl;
      } else {
        window.location.href = "index.html";
      }
    });
  }

  backBtn.addEventListener("click", () => {
    const redirect = localStorage.getItem("redirectAfterLogin");

    if (redirect) {
      localStorage.removeItem("redirectAfterLogin");
      window.location.href = redirect;
    } else {
      window.location.href = "index.html";
    }
  });

});

 