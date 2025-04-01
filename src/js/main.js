import '../scss/style.scss';
import { writePost, readPosts } from '../../data/firebase.js'; 
import { loadHeader } from "../components/header/header.js";
import { loadFooter } from "../components/footer/footer.js";
import { loadFeatures } from "../components/features/features.js";
import { loadSignUp } from "../components/sign-up/sign-up.js";
import { loadDesignCommunity } from "../components/design-community/design-community.js";

document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();
    loadFeatures();
    loadSignUp();
    loadDesignCommunity();
});

