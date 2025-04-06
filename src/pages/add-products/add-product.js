import { db, storage } from "../../../data/firebase.js";
import { ref as dbRef, set } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

// Находим элементы формы
const form = document.getElementById("productForm");
const status = document.getElementById("status");

// Функция загрузки изображения в Firebase Storage
async function uploadImage(file) {
  const fileRef = storageRef(storage, `products/${Date.now()}-${file.name}`);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef); // Возвращаем ссылку на картинку
}

// Обработчик отправки формы
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = form.title.value.trim();
  const price = parseFloat(form.price.value);
  const description = form.description.value.trim();
  const imageFile = form.image.files[0];

  if (!imageFile || !title || !price || !description) {
    status.textContent = "Пожалуйста, заполните все поля.";
    return;
  }

  status.textContent = "Загрузка...";

  try {
    const imageUrl = await uploadImage(imageFile);
    const productId = `product-${Date.now()}`;
    await set(dbRef(db, `/products/${productId}`), {
      title,
      price,
      description,
      imageUrl,
    });

    status.textContent = "Товар успешно добавлен!";
    form.reset();
  } catch (error) {
    console.error("Ошибка загрузки:", error);
    status.textContent = "Произошла ошибка при загрузке.";
  }
});