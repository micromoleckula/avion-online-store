import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";
import '../scss/style.scss';

// Підключаємо Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Функція для запису в Firebase
function writePost(id, title, content) {
  return set(ref(db, `/posts/${id}`), {
    title,
    content
  })
    .then(() => console.log(`✅ Пост ${id} записаний!`))
    .catch(error => console.error(`❌ Помилка запису:`, error));
}

// Функція для читання постів з Firebase
function readPosts() {
  get(ref(db, "/posts"))
    .then(snapshot => {
      if (snapshot.exists()) {
        console.log("📌 Отримані пости:", snapshot.val());
      } else {
        console.log("⚠ Даних немає");
      }
    })
    .catch(error => console.error("❌ Помилка читання:", error));
}

// Записуємо тестовий пост
writePost("1", "Новий пост", "Дані збережено у Firebase!");

// Читаємо пости через 1 секунду після запису
setTimeout(() => {
  readPosts();
}, 1000);

// Обробка кнопки для завантаження постів вручну
document.getElementById("load-posts").addEventListener("click", () => {
  readPosts();
});

// Виведення в DOM для тесту
app.innerHTML = `
  <h1 class="hello">hello</h1>
  <button id="load-posts">Завантажити пости</button>
`;
