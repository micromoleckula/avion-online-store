export function loadCart() {
  const basketList = document.getElementById("basket-list");
  const basketEmpty = document.getElementById("basket-empty");
  const totalPriceEl = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");
  const modal = document.getElementById("order-modal");
  const orderForm = document.getElementById("order-form");
  const orderSuccess = document.getElementById("order-success");
  const closeModalBtn = document.getElementById("close-modal");

  // Загрузка корзины
  function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      basketEmpty.style.display = "block";
      basketList.innerHTML = "";
      totalPriceEl.textContent = "0 $";
      return;
    }

    basketEmpty.style.display = "none";
    basketList.innerHTML = "";

    let totalPrice = 0;

    cart.forEach((product, index) => {
      totalPrice += product.price;

      const item = document.createElement("div");
      item.classList.add("basket__item");
      item.innerHTML = `
        <img class="basket__item-image" src="${product.imageUrl}" alt="${product.title}">
        <div class="basket__item-details">
          <h3 class="basket__item-title">${product.title}</h3>
          <p class="basket__item-price">${product.price} $</p>
        </div>
        <button class="basket__item-remove" data-index="${index}">Удалить</button>
      `;

      basketList.appendChild(item);
    });

    totalPriceEl.textContent = `${totalPrice.toFixed(2)} $`;

    // Удаление товара из корзины
    document.querySelectorAll(".basket__item-remove").forEach(button => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        removeFromCart(index);
      });
    });
  }

  function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  // Открытие модального окна
  checkoutBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Обработка формы
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("order-name").value.trim();
    const address = document.getElementById("order-address").value.trim();

    if (name && address) {
      // Очищаем корзину
      localStorage.removeItem("cart");
      renderCart();

      // Показываем сообщение об успехе
      orderForm.style.display = "none";
      orderSuccess.style.display = "flex";
    } else {
      alert("Пожалуйста, заполните все поля.");
    }
  });

  // Закрытие модального окна
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
    orderForm.style.display = "block";
    orderSuccess.style.display = "none";
    orderForm.reset();
  });

  // Закрытие модального окна при клике вне его
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      orderForm.style.display = "block";
      orderSuccess.style.display = "none";
      orderForm.reset();
    }
  });

  // Инициализация загрузки корзины
  renderCart();
}