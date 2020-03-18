import app from "firebase/app";
import "firebase/auth";
import FirebaseContext, { withFirebase } from "./context";


const Config = {
  apiKey: "AIzaSyCGnGYP7d17Zh2TxLyq0OpePuqOuA6QJt0",
  authDomain: "sirpecqr.firebaseapp.com",
  databaseURL: "https://sirpecqr.firebaseio.com",
  projectId: "sirpecqr",
  storageBucket: "sirpecqr.appspot.com",
  messagingSenderId: "339011890131",
  appId: "1:339011890131:web:5d49db38b963316e40dd26",
  measurementId: "G-J75WFNYW32"
};


class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }
  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export { FirebaseContext, withFirebase };
export default Firebase;