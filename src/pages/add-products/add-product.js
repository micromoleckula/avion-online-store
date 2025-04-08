import { db, storage } from "/data/firebase.js";
import { ref as dbRef, set } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL} from "firebase/storage";

const form = document.getElementById("productForm");
const status = document.getElementById("status");

async function uploadImage(file) {
  const fileRef = storageRef(storage, `products/${Date.now()}-${file.name}`);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = form.title.value.trim();
  const price = parseFloat(form.price.value);
  const description = form.description.value.trim();
  const imageFile = form.image.files[0];

  if (!imageFile || !title || !price || !description) {
    status.textContent = "Please fill in all fields.";
    return;
  }

  status.textContent = "Loading...";

  try {
    const imageUrl = await uploadImage(imageFile);
    const productId = `product-${Date.now()}`;
    await set(dbRef(db, `/products/${productId}`), {
      title,
      price,
      description,
      imageUrl,
    });

    status.textContent = "Product successfully added!";
    form.reset();
  } catch (error) {
    console.error("Download Error:", error);
    status.textContent = "There was a download error.";
  }
});
