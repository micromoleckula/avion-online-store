import '../scss/style.scss';
import { loadHeader } from "../components/header/header.js";
import { loadFooter } from "../components/footer/footer.js";
import { loadFeatures } from "../components/features/features.js";
import { loadPopularProducts } from "../components/popular-products/popular-products.js";
import { loadSignUp } from "../components/sign-up/sign-up.js";
import { loadDesignCommunity } from "../components/design-community/design-community.js";
import { loadProductDetails } from "../pages/detail-page/detail-page.js"

document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  loadFeatures();
  loadPopularProducts();
  loadSignUp();
  loadDesignCommunity();
  loadFooter();
  loadProductDetails();

  if (window.location.pathname.includes("basket")) {
    import("../pages/basket/basket.js").then(module => {
      module.loadCart();
    }).catch(error => {
      console.error("Ошибка загрузки basket:", error);
    });
  }

  if (window.location.pathname.includes("add-products")) {
    import("../pages/add-products/add-product.js");
  }

  if (window.location.pathname.includes("all-products")) {
    import("../pages/all-products/all-product.js").then(module => {
      module.loadAllProducts();
    }).catch(error => {
      console.error("Ошибка загрузки all-products:", error);
    });
  }
});