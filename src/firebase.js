// firebase.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
        apiKey: "AIzaSyBThfah26tTVK2BUi1qAEiD-MJGVkoIBZQ",
        authDomain: "salmanreact007.firebaseapp.com",
        projectId: "salmanreact007",
        storageBucket: "salmanreact007.appspot.com",
        messagingSenderId: "1082356100669",
        databaseURL: 'https://salmanreact007-default-rtdb.firebaseio.com',
        appId: "1:1082356100669:web:2732200e6acc1034a5c454"
};


const app = initializeApp(firebaseConfig);

export default app;