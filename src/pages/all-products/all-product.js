import { db } from "../../../data/firebase.js";
import { ref as dbRef, get } from "firebase/database";

export async function loadAllProducts() {
  const productList = document.getElementById("productList");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  let allProducts = [];
  let currentIndex = 0;
  const PRODUCTS_PER_PAGE = 9;

  async function fetchProducts() {
    try {
      const productsSnapshot = await get(dbRef(db, "/products"));
      if (productsSnapshot.exists()) {
        const products = productsSnapshot.val();
        allProducts = Object.entries(products).map(([id, data]) => ({ id, ...data }));
        renderNextProducts();
      } else {
        productList.innerHTML = "<p>Товары не найдены.</p>";
      }
    } catch (error) {
      console.error("Ошибка загрузки товаров:", error);
    }
  }

  function renderNextProducts() {
    const nextProducts = allProducts.slice(currentIndex, currentIndex + PRODUCTS_PER_PAGE);
    currentIndex += PRODUCTS_PER_PAGE;

    nextProducts.forEach((product) => {
      const card = renderProductCard(product);
      productList.appendChild(card);
    });

    if (currentIndex >= allProducts.length) {
      loadMoreBtn.style.display = "none";
    }
  }

  function renderProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("catalog__card");
    card.innerHTML = `
      <img 
        class="catalog__card-image" 
        src="${product.imageUrl}" 
        alt="${product.title}" 
        data-id="${product.id}" 
        style="cursor: pointer;"
      >
      <h3 class="catalog__card-title">${product.title}</h3>
      <p class="catalog__card-price">${product.price} $</p>
      <p class="catalog__card-description">${product.description}</p>
      <div class="catalog__card-buttons">
        <button class="catalog__btn-more" data-id="${product.id}">Больше про товар</button>
        <button class="catalog__btn-add" data-id="${product.id}">Добавить в корзину</button>
      </div>
    `;

    const image = card.querySelector(".catalog__card-image");
    const moreBtn = card.querySelector(".catalog__btn-more");
    const addBtn = card.querySelector(".catalog__btn-add");

    [image, moreBtn].forEach(el => {
      el.addEventListener("click", () => {
        window.location.href = `/src/pages/detail-page/detail-page.html?id=${product.id}`;
      });
    });

    addBtn.addEventListener("click", () => {
      addToCart(product);
    });

    return card;
  }

  function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title} добавлен в корзину`);
  }

  loadMoreBtn.addEventListener("click", renderNextProducts);

  fetchProducts();
}