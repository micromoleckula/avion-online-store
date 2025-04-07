import { db } from "../../../data/firebase.js";
import { ref as dbRef, get } from "firebase/database";

const productList = document.getElementById("productList");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let allProducts = [];
let currentIndex = 0;
const PRODUCTS_PER_PAGE = 9;

// Загружаем товары с Firebase
async function fetchProducts() {
  try {
    const productsSnapshot = await get(dbRef(db, "/products"));
    if (productsSnapshot.exists()) {
      const products = productsSnapshot.val();
      allProducts = Object.entries(products).map(([id, data]) => ({ id, ...data }));
      renderNextProducts(); // Загружаем первую партию
    } else {
      productList.innerHTML = "<p>Товары не найдены.</p>";
    }
  } catch (error) {
    console.error("Ошибка загрузки товаров:", error);
  }
}

// Отображаем следующую партию товаров
function renderNextProducts() {
  const nextProducts = allProducts.slice(currentIndex, currentIndex + PRODUCTS_PER_PAGE);
  currentIndex += PRODUCTS_PER_PAGE;

  nextProducts.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("catalog__card");

    card.innerHTML = `
      <img class="catalog__card-image" src="${product.imageUrl}" alt="${product.title}">
      <h3 class="catalog__card-title">${product.title}</h3>
      <p class="catalog__card-price">${product.price} $</p>
      <p class="catalog__card-description">${product.description}</p>
    `;

    productList.appendChild(card);
  });

  // Если товаров больше нет — прячем кнопку
  if (currentIndex >= allProducts.length) {
    loadMoreBtn.style.display = "none";
  }
}

// Слушатель на кнопку "Load more"
loadMoreBtn.addEventListener("click", renderNextProducts);

// Первая загрузка
fetchProducts();
