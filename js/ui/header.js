import { renderCart, updateCartQuantityUI } from "./cart.js";

export function initHeader(){
    const html = document.documentElement;
    const body = document.body;

    const header = document.querySelector(".header");
    const isHome = document.body.classList.contains("home");

    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-list a');

    const overlay = document.querySelector('.overlay');
    
    const cartBtn = document.querySelector(".cart-btn");
    const cartPanel = document.querySelector(".cart-overlay");
    const cartCloseBtn = document.querySelector(".cart-close");
   
    /* usuario */
    const userIcon = document.querySelector(".user-btn");
    const dropdown = document.querySelector(".user-dropdown");

    /* ---------------- SCROLL CONTROL ---------------- */
    function disableScroll() {
        if (window.innerWidth <= 768) {
            html.classList.add('no-scroll');
            body.classList.add('no-scroll');
        }
    }

    function enableScroll() {
        html.classList.remove('no-scroll');
        body.classList.remove('no-scroll');
    }

    /* ---------------- CLOSE ALL ---------------- */
    function closeAllPanels() {
        nav.classList.remove("active");
        dropdown.classList.remove("active");

        if (cartPanel) {
            cartPanel.classList.remove("active");
        }

        overlay.classList.remove("active");
        menuToggle.classList.remove("active");

        enableScroll();

        if (isHome) handleScroll();
    }

    /* ---------------- MENU ---------------- */
    function openMenu() {
        closeAllPanels();

        nav.classList.add('active');
        overlay.classList.add('active');
        menuToggle.classList.add('active');

        disableScroll();

        // Forzar header blanco en home
        if (isHome) {
            header.classList.add("scrolled");
        }
    }

    menuToggle.addEventListener('click', () => {
        nav.classList.contains('active') ? closeAllPanels() : openMenu();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', closeAllPanels);
    });

    /* ---------------- USER ---------------- */
    if (userIcon && dropdown) {

        function renderDropdown() {
            const user = JSON.parse(localStorage.getItem("user"));

            if (user) {
                dropdown.innerHTML = `
                    <div class="dropdown-guest">
                        <div class="dropdown-brand">ozzy</div>

                        <p class="user-greeting">
                            Hola, <span>${user.email}</span>
                        </p>

                        <button class="btn btn-primary logout-btn">
                            Cerrar sesión
                        </button>
                    </div>
                `;
                userIcon.classList.add("logged");
            } else {
                dropdown.innerHTML = `
                    <div class="dropdown-guest">
                        <div class="dropdown-brand">ozzy</div>

                        <h4 class="dropdown-title">
                            Registrate gratis y accedé a lo mejor de la tienda
                        </h4>

                        <button class="btn btn-primary login-btn">
                            Registrate / Login 
                        </button>
                    </div>
                `;
                userIcon.classList.remove("logged");
            }
        }

        function openUserPanel() {
            closeAllPanels();
            renderDropdown();
            dropdown.classList.add("active");
            overlay.classList.add("active");
            disableScroll();
        }

        renderDropdown();

        userIcon.addEventListener("click", () => {
            dropdown.classList.contains("active")
                ? closeAllPanels()
                : openUserPanel();
        });

        dropdown.addEventListener("click", (e) => {
            if (e.target.classList.contains("logout-btn")) {
                localStorage.removeItem("user");
                renderDropdown(); // 👈 actualiza UI
                closeAllPanels();
            }

            if (e.target.classList.contains("login-btn")) {
                window.location.href = "login.html";
            }
        });
    }

    /* ---------------- CART ---------------- */

    if (cartBtn && cartPanel) {

        function openCartPanel() {
            closeAllPanels();

            cartPanel.classList.add("active");
            overlay.classList.add("active");

            disableScroll();
            renderCart();
        }

        cartBtn.addEventListener("click", () => {
            cartPanel.classList.contains("active")
                ? closeAllPanels()
                : openCartPanel();
        });

    }

    if (cartCloseBtn) {
        cartCloseBtn.addEventListener("click", closeAllPanels);
    }
   
    /* ---------------- OVERLAY ---------------- */
    if (overlay) {
        overlay.addEventListener("click", closeAllPanels);
    }

    /* ---------------- SCROLL HEADER ---------------- */

    function handleScroll() {
        if (!isHome) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    if (isHome) {
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // actualiza estado al cargar
    }

    
    updateCartQuantityUI();
}
