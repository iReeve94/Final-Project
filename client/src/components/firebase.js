import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBw97AV8yQBrnNQRlUTE8MIh4zcqk0jLvM",
  authDomain: "fpupload-39069.firebaseapp.com",
  projectId: "fpupload-39069",
  storageBucket: "fpupload-39069.appspot.com",
  messagingSenderId: "351204552746",
  appId: "1:351204552746:web:9592c8e805596a148fd353",
  measurementId: "G-HN55KQDT8Y"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);