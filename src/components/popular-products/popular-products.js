import { db } from "../../../data/firebase.js";
import { ref as dbRef, get } from "firebase/database";

const popularProductsPath = new URL('popular-products.html', import.meta.url).href;

export async function loadPopularProducts() {
  const popularProductsElement = document.getElementById("popular-products");

  if (popularProductsElement) {
    try {
      const response = await fetch(popularProductsPath);
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
        .reverse()         // <-- Последние первыми
        .slice(0, 4);      // <-- Только 4 штуки

      container.innerHTML = "";

      productArray.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("popular-products__card");

        card.innerHTML = `
          <img class="popular-products__card-image" src="${product.imageUrl}" alt="${product.title}">
          <h3 class="popular-products__card-title">${product.title}</h3>
          <p class="popular-products__card-price">${product.price} $</p>
          <p class="popular-products__card-description">${product.description}</p>
        `;

        container.appendChild(card);
      });
    } else {
      container.innerHTML = "<p>Товары не найдены.</p>";
    }
  } catch (error) {
    console.error("Помилка отримання даних продуктів:", error);
  }
}
