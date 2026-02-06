document.querySelector(".register-form").addEventListener("submit", e => {
    e.preventDefault();

    const name = document.querySelector("#name").value;
    const lastname = document.querySelector("#lastname").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirmPassword").value;

    if (password != confirmPassword ){
        alert('Contraseña incorrecta');
        return;
    }

    // registro fake
    localStorage.setItem("user", JSON.stringify({
        name,
        lastname,
        email,
        type: "member"
    }));

    window.location.href = "checkout.html";
});

document.querySelector(".continue-shopping").addEventListener("click", () => {
    window.location.href = "checkout.html";
});