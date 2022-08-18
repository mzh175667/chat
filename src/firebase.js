// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const Config = {
  apiKey: "AIzaSyB_voYcmJFLyQMH1WPLmsUh1EXyS64_K64",
  authDomain: "my-first-project-a2c5c.firebaseapp.com",
  databaseURL: "https://my-first-project-a2c5c-default-rtdb.firebaseio.com",
  projectId: "my-first-project-a2c5c",
  storageBucket: "my-first-project-a2c5c.appspot.com",
  messagingSenderId: "299851015132",
  appId: "1:299851015132:web:a5e6e658c738b1d2336519",
};
// Initialize Firebase
firebase.initializeApp(Config);
export default firebase;
