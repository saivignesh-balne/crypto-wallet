import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDiO__CUm3qY6V-f3JKj5Cf1XF6rNNex18",
  authDomain: "brv-crypto-wallet.firebaseapp.com",
  projectId: "brv-crypto-wallet",
  storageBucket: "brv-crypto-wallet.firebasestorage.app",
  messagingSenderId: "514975358044",
  appId: "1:514975358044:web:328af44cbfbedde8611a99"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export { auth };
export default app;