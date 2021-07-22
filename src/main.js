import { createApp } from 'vue';
import App from '@/App.vue';
import Toast from 'vue-toastification';
import firebase from 'firebase/app';
import router from '@/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle, faSyncAlt, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'firebase/auth';
import 'vue-toastification/dist/index.css';
import '@/styles/css/main.css';
import '@sweetalert2/theme-dark/dark.css';

const app = createApp(App);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0lkC0zkK7RZl0C3SIsIHQhg-KRloXW4c",
  authDomain: "project-magang-rauf21.firebaseapp.com",
  projectId: "project-magang-rauf21",
  storageBucket: "project-magang-rauf21.appspot.com",
  messagingSenderId: "814838973328",
  appId: "1:814838973328:web:0131c69eeb98c3ebc6a915"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

library.add(faUserCircle, faSyncAlt, faHome);

app.component('FAIcon', FontAwesomeIcon);

app.use(Toast);
app.use(router);
app.mount('#app');
