import { db } from "/data/firebase.js";
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
        .reverse()
        .slice(0, 4);

      container.innerHTML = "";

      productArray.forEach((product) => {
        const card = createProductCard(product);
        container.appendChild(card);
      });
    } else {
      container.innerHTML = "<p>Goods not found.</p>";
    }
  } catch (error) {
    console.error("Error receiving product data:", error);
  }
}

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
      <button class="popular-products__btn-more" data-id="${product.id}">More</button>
      <button class="popular-products__btn-add" data-id="${product.id}">Add to cart</button>
    </div>
  `;

  const image = card.querySelector(".popular-products__card-image");
  const moreBtn = card.querySelector(".popular-products__btn-more");

  [image, moreBtn].forEach(el => {
    el.addEventListener("click", () => {
      window.location.href = `/src/pages/detail-page/detail-page.html?id=${product.id}`;
    });
  });

  const addBtn = card.querySelector(".popular-products__btn-add");
  addBtn.addEventListener("click", () => {
    addToCart(product);
  });

  return card;
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.title} added to basket`);
}