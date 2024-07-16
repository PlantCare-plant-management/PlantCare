// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const { getStorage } = require("firebase/storage");
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDh5EliDS3LtqtiXEx-NTRVQ30Y9O7FRAY",
  authDomain: "plantcare-group.firebaseapp.com",
  projectId: "plantcare-group",
  storageBucket: "plantcare-group.appspot.com",
  messagingSenderId: "648688314078",
  appId: "1:648688314078:web:3431b5eb75a9f4e4dc444f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = storage;
