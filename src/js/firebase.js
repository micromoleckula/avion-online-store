import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";

// Конфігурація Firebase
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

// Функція для запису даних у Firebase
function writePost(id, title, content) {
  return set(ref(db, `/posts/${id}`), {
    title,
    content
  })
    .then(() => console.log(`✅ Пост ${id} записаний!`))
    .catch(error => console.error(`❌ Помилка запису:`, error));
}

// Функція для зчитування постів
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

// Експортуємо функції
export { writePost, readPosts };