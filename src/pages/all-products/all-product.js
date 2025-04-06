import { db } from "../../../data/firebase.js";
import { ref as dbRef, get } from "firebase/database";

// Находим элемент для отображения карточек
const productList = document.getElementById("productList");

// Функция для получения данных о товарах
async function fetchProducts() {
  const productsSnapshot = await get(dbRef(db, "/products"));
  if (productsSnapshot.exists()) {
    const products = productsSnapshot.val();
    renderProducts(products);
  } else {
    productList.innerHTML = "<p>Товары не найдены.</p>";
  }
}

// Функция для отображения товаров
function renderProducts(products) {
  const productArray = Object.entries(products).map(([id, data]) => ({ id, ...data }));
  productList.innerHTML = ""; // Очищаем контейнер

  productArray.forEach((product) => {
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
}

// Запускаем загрузку товаров
fetchProducts();