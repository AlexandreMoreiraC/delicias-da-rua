import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA8CsS97b8pTsLWladh0N-9ULYD71gBWNs",
  authDomain: "delicias-da-rua.firebaseapp.com",
  projectId: "delicias-da-rua",
  storageBucket: "delicias-da-rua.appspot.com",
  messagingSenderId: "102198809747",
  appId: "1:102198809747:web:10a92b8c709df26a876966",
  measurementId: "G-9D401EXD9V"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export let analytics;
isSupported().then(supported => {
  if (supported) analytics = getAnalytics(app);
});
