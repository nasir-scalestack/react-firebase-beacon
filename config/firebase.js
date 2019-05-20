import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyA-eJKwGNj1qBoGK-6YPh18BOpR555jjs4',
  authDomain: 'ap1-demo-app.firebaseapp.com',
  databaseURL: 'https://ap1-demo-app.firebaseio.com',
  projectId: 'ap1-demo-app',
  storageBucket: 'ap1-demo-app.appspot.com',
  messagingSenderId: '685927665140',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const databaseRef = firebase.database().ref();
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
