import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSktol8Vl9YV3fR2hLzUZPzCye9Jqor14",
  authDomain: "discord-clone-31712.firebaseapp.com",
  databaseURL: "https://discord-clone-31712.firebaseio.com",
  projectId: "discord-clone-31712",
  storageBucket: "discord-clone-31712.appspot.com",
  messagingSenderId: "926713157759",
  appId: "1:926713157759:web:0216780f3dda7ae6ca474a",
  measurementId: "G-EE38VYYBKE",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, storage, provider, db };
