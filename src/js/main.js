import '../scss/style.scss';
import { loadHeader } from "../components/header/header.js";
import { loadFooter } from "../components/footer/footer.js";
import { loadFeatures } from "../components/features/features.js";
import { loadSignUp } from "../components/sign-up/sign-up.js";
import { loadDesignCommunity } from "../components/design-community/design-community.js";

document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  loadFeatures();
  loadSignUp();
  loadDesignCommunity();
  loadFooter();

  // Подключаем логику загрузки товара только на странице add-products
  if (window.location.pathname.includes("add-products")) {
    import("../pages/add-products/add-product.js");
  }
});