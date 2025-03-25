// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1CxlQeXkrWLnhwvMwkVToPlWkAySGS1A",
  authDomain: "avion-prokop.firebaseapp.com",
  databaseURL: "https://avion-prokop-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "avion-prokop",
  storageBucket: "avion-prokop.firebasestorage.app",
  messagingSenderId: "59764242583",
  appId: "1:59764242583:web:a0753d4909812b0e2f11d2"
};

db.ref('posts').get()
  .then(snapshot => {
    if (snapshot.exists()) {
      console.log("Полученные данные:", snapshot.val());
    } else {
      console.log("Данные не найдены");
    }
  })
  .catch(error => {
    console.error("Ошибка при запросе данных:", error);
  });
import '../scss/style.scss';



app.innerHTML = `
  <h1 class="hello">hello</h1>
`