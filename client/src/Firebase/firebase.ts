import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { SECRET } from "../secret"

const firebaseConfig = {
    apiKey: SECRET.API_KEY,
    authDomain: SECRET.AUTH_DOMAIN,
    projectId: SECRET.PROJECT_ID,
    storageBucket: SECRET.STORAGE_BUCKET,
    messagingSenderId: SECRET.MESSAGING_SENDER_ID,
    appId: SECRET.APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth()
