import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyB1mztC6iUS9_Y7JetgNOtLLmMgavQwFmY",
  authDomain: "the-beachlife-app.firebaseapp.com",
  databaseURL: "https://the-beachlife-app.firebaseio.com",
  projectId: "the-beachlife-app",
  storageBucket: "the-beachlife-app.appspot.com",
  messagingSenderId: "482727745030",
  appId: "1:482727745030:web:1e78a5ae9358c562"

  }

const fb = firebase.initializeApp(firebaseConfig)
const db = fb.database();
const auth = fb.auth();

export {
    db,
    auth,
    fb
}
