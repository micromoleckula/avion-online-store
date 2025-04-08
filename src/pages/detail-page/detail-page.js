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
        document.getElementById("product-details").innerHTML = "<p>Item not found.</p>";
      }
    } catch (error) {
      console.error("Error loading product data:", error);
    }
  }
}

function displayProductDetails(product) {
  const container = document.getElementById("product-details");
  container.innerHTML = `
    <div class="detail__card">
      <img class="detail__image" src="${product.imageUrl}" alt="${product.title}">
      <div class="detail__info"
        <h1 class="detail__title">${product.title}</h1>
        <p class="detail__price">${product.price} $</p>
        <p class="detail__description">${product.description}</p>
        <button id="add-to-cart-btn" class="detail__add-to-cart">Add to cart</button>
      </div>
    </div>
  `;
  
  document.getElementById("add-to-cart-btn").addEventListener("click", () => {
    addToCart(product);
  });
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.title} added to basket`);
}