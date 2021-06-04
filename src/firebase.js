import firebase from "firebase";
const firebaseApp = firebase.initializeApp(
    {
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

    apiKey: "AIzaSyAjIRBg6j-kTlaDtUK3t8gphrEdz0mTVTI",
    authDomain: "movieshop-416b8.firebaseapp.com",
    projectId: "movieshop-416b8",
    storageBucket: "movieshop-416b8.appspot.com",
    messagingSenderId: "167558452114",
    appId: "1:167558452114:web:41e89ba165852727f2a74b",
    measurementId: "G-BDL0KJDFF8"
  
}
);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db,auth,storage }