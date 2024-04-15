import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import Firebase authentication module

const firebaseConfig = {
  // Your Firebase project configuration
  apiKey: "AIzaSyBIlSHIQ5QrpC4VQuy7mldJTa-s5ZCF4XY",
  authDomain: "cashtagram-web-app.firebaseapp.com",
  projectId: "cashtagram-web-app",
  storageBucket: "cashtagram-web-app.appspot.com",
  messagingSenderId: "761780964808",
  appId: "1:761780964808:web:a69b1c9e8d8bc60c7744fd",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

// export { db }; // Export Firestore and authentication modules
