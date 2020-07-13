import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD-INLer4lktscx657Zho51PStJZ7H3-F8",
  authDomain: "redux-help-queue-c.firebaseapp.com",
  databaseURL: "https://redux-help-queue-c.firebaseio.com",
  projectId: "redux-help-queue-c",
  storageBucket: "redux-help-queue-c.appspot.com",
  messagingSenderId: "291844407409",
  appId: "1:291844407409:web:e2d2db793188ba61e7dbd0",
  measurementId: "G-6EYGBBP79T"
};


firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;