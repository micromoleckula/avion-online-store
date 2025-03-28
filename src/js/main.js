import '../scss/style.scss';
import { writePost, readPosts } from '../../data/firebase.js'; 
import { loadHeader } from "../components/header/header.js";
import { loadFooter } from "../components/footer/footer.js";

document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();
});

