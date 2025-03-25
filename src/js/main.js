import '../scss/style.scss';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";

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

// Обробка події submit форми
document.getElementById("post-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Запобігаємо перезавантаженню сторінки при відправці форми

  // Отримуємо значення з форми
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  // Генеруємо ID для нового поста (наприклад, на основі поточного часу)
  const id = Date.now(); // Використовуємо мілісекунди для унікальності

  // Записуємо новий пост у Firebase
  writePost(id, title, content)
    .then(() => {
      // Показуємо повідомлення про успішний запис
      document.getElementById("message").innerHTML = "Пост успішно додано!";
      
      // Очищаємо форму після запису
      document.getElementById("post-form").reset();
    })
    .catch(error => {
      document.getElementById("message").innerHTML = `Помилка: ${error.message}`;
    });
});

// Читаємо пости через 1 секунду після запису
setTimeout(() => {
  readPosts();
}, 1000);

// Обробка кнопки для завантаження постів вручну
document.getElementById("load-posts").addEventListener("click", () => {
  readPosts();
});

appka.innerHTML = `
  <h1>Hello</h1>
`