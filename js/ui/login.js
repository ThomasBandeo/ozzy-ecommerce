document.querySelector(".login-form").addEventListener("submit", e => {
  e.preventDefault();

  const email = document.querySelector("#email").value;

  // login fake
  localStorage.setItem("user", JSON.stringify({
    email,
    type: "member"
  }));

  window.location.href = "checkout.html";
});

document.querySelector(".continue-shopping").addEventListener("click", () => {
  window.location.href = "checkout.html";
});
