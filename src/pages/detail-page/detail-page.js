import { db } from "/data/firebase.js";
import { ref as dbRef, get } from "firebase/database";

export async function loadProductDetails() {
  const productId = new URLSearchParams(window.location.search).get("id");
  if (productId) {
    try {
      const productSnapshot = await get(dbRef(db, `/products/${productId}`));
      if (productSnapshot.exists()) {
        const product = productSnapshot.val();
        displayProductDetails(product);
        document.getElementById("title__page").textContent = `${product.title} | Avion`;
      } else {
        document.getElementById("product-details").innerHTML = "<p>Товар не найден.</p>";
      }
    } catch (error) {
      console.error("Ошибка загрузки данных товара:", error);
    }
  }
}

function displayProductDetails(product) {
  const container = document.getElementById("product-details");
  container.innerHTML = `
    <div class="detail__card">
      <img class="detail__image" src="${product.imageUrl}" alt="${product.title}">
      <h1 class="detail__title">${product.title}</h1>
      <p class="detail__price">${product.price} $</p>
      <p class="detail__description">${product.description}</p>
      <button id="add-to-cart-btn" class="detail__add-to-cart">Добавить в корзину</button>
    </div>
  `;
  
  // Добавляем обработчик кнопки "Добавить в корзину"
  document.getElementById("add-to-cart-btn").addEventListener("click", () => {
    addToCart(product); // Вызываем функцию добавления в корзину
  });
}

// Функция добавления товара в корзину
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product); // Добавляем товар в массив
  localStorage.setItem("cart", JSON.stringify(cart)); // Сохраняем обновленный массив в localStorage
  alert(`${product.title} добавлен в корзину`);
}