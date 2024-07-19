const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "plantcare-group.firebaseapp.com",
  projectId: "plantcare-group",
  storageBucket: "plantcare-group.appspot.com",
  messagingSenderId: "648688314078",
  appId: "1:648688314078:web:3431b5eb75a9f4e4dc444f",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = storage;
