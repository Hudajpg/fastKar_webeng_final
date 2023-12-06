import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

//import { getFirestore } from "firebase-admin/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcWDulw8AdDHzDLurf22ar9t9bVJ7a1yU",
  authDomain: "fastkar-cosc484.firebaseapp.com",
  projectId: "fastkar-cosc484",
  storageBucket: "fastkar-cosc484.appspot.com",
  messagingSenderId: "556112071801",
  appId: "1:556112071801:web:bfb99754a6f12fdd4bd8a8",
  measurementId: "G-V6511Z272T"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);


export { auth, analytics, firestore,storage };
