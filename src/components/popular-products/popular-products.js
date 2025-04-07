import { db } from "../../../data/firebase.js";
import { ref as dbRef, get } from "firebase/database";

export async function loadPopularProducts() {
  const popularProductsElement = document.getElementById("popular-products");
  if (popularProductsElement) {
    try {
      const response = await fetch(new URL('popular-products.html', import.meta.url).href);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      popularProductsElement.innerHTML = await response.text();

      const popularProductsBox = document.getElementById("popular-products__box");
      if (popularProductsBox) {
        fetchAndRenderProducts(popularProductsBox);
      }
    } catch (error) {
      console.error("Помилка завантаження popular-products:", error);
    }
  }
}

async function fetchAndRenderProducts(container) {
  try {
    const productsSnapshot = await get(dbRef(db, "/products"));
    if (productsSnapshot.exists()) {
      const products = productsSnapshot.val();

      const productArray = Object.entries(products)
        .map(([id, data]) => ({ id, ...data }))
        .reverse() // Последние первыми
        .slice(0, 4); // Только 4 штуки

      container.innerHTML = "";

      productArray.forEach((product) => {
        const card = createProductCard(product);
        container.appendChild(card);
      });
    } else {
      container.innerHTML = "<p>Товары не найдены.</p>";
    }
  } catch (error) {
    console.error("Помилка отримання даних продуктів:", error);
  }
}

// Создание карточки товара
function createProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("popular-products__card");
  card.innerHTML = `
    <img 
      class="popular-products__card-image" 
      src="${product.imageUrl}" 
      alt="${product.title}" 
      data-id="${product.id}"
      style="cursor: pointer;"
    >
    <h3 class="popular-products__card-title">${product.title}</h3>
    <p class="popular-products__card-price">${product.price} $</p>
    <p class="popular-products__card-description">${product.description}</p>
    <div class="popular-products__card-buttons">
      <button class="popular-products__btn-more" data-id="${product.id}">Больше про товар</button>
      <button class="popular-products__btn-add" data-id="${product.id}">Добавить в корзину</button>
    </div>
  `;

  // Клик по изображению или кнопке "Больше про товар"
  const image = card.querySelector(".popular-products__card-image");
  const moreBtn = card.querySelector(".popular-products__btn-more");

  [image, moreBtn].forEach(el => {
    el.addEventListener("click", () => {
      window.location.href = `/src/pages/detail-page/detail-page.html?id=${product.id}`;
    });
  });

  // Кнопка "Добавить в корзину"
  const addBtn = card.querySelector(".popular-products__btn-add");
  addBtn.addEventListener("click", () => {
    addToCart(product); // Вызываем функцию добавления в корзину
  });

  return card;
}

// Функция добавления товара в корзину
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product); // Добавляем товар в массив
  localStorage.setItem("cart", JSON.stringify(cart)); // Сохраняем обновленный массив в localStorage
  alert(`${product.title} добавлен в корзину`);
}