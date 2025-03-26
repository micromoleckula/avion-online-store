import '../scss/style.scss';
import { writePost, readPosts } from '../../data/firebase.js'; 
import { headerComponent } from '../components/header/header.js';

let app = document.getElementById('app');

app.innerHTML = `${headerComponent}`;
