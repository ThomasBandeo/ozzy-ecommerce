import { renderCart } from "./cart.js";
import { updateCartQuantityUI } from "./cart.js";
export function initHeader(){

    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-list a');
    const overlay = document.querySelector('.overlay');
    const html = document.documentElement;
    const body = document.body;
    
    /* carrito */
    const cartBtn = document.querySelector(".cart-btn");
    
    cartBtn.addEventListener("click", () => {
        renderCart();
    });

    function disableScroll() {
        html.classList.add('no-scroll');
        body.classList.add('no-scroll');
    }

    function enableScroll() {
        html.classList.remove('no-scroll');
        body.classList.remove('no-scroll');
    }

    function openMenu() {
        nav.classList.add('active');
        overlay.classList.add('active');
        menuToggle.classList.add('active');
        disableScroll();
    }

    function closeMenu() {
        nav.classList.remove('active');
        overlay.classList.remove('active');
        menuToggle.classList.remove('active');
        enableScroll();
    }

    menuToggle.addEventListener('click', () => {
        nav.classList.contains('active') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    updateCartQuantityUI();
}
