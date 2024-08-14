import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBzcyCJgygMGDsR_YvPLzzgRUxuQNU_uoM",
  authDomain: "mytv-auth.firebaseapp.com",
  projectId: "mytv-auth",
  storageBucket: "mytv-auth.appspot.com",
  messagingSenderId: "674959951397",
  appId: "1:674959951397:web:549d9d5d5d3eae9724a1cc",
};

export const initFirebase = () : void => {
  initializeApp(firebaseConfig);
};
