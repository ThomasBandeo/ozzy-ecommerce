import { headerComponent } from "../components/headerComponent.js";
import { cartOverlayComponent } from "../components/cartOverlayComponent.js";
import { footerComponent } from "../components/footerComponent.js";
import { benefitComponent } from "../components/benefitComponent.js";


export function renderLayout(options = {}) {
  const {
    showFooter = false,
    showBenefits = false
  } = options;

  document.body.insertAdjacentHTML("afterbegin", headerComponent());
  document.body.insertAdjacentHTML("beforeend", cartOverlayComponent());

  if (showBenefits) {
  const main = document.querySelector("main");
    if (main) {
      main.insertAdjacentHTML("beforeend", benefitComponent());
    }
  }

  if (showFooter) {
    document.body.insertAdjacentHTML("beforeend", footerComponent());
  }
  
}