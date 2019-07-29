import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

const config = {
  apiKey: 'AIzaSyCdwfkBKZ8gzSUlAS5Lqi8Nr4uVWRo7SfI',
  authDomain: 'mudrextodo.firebaseapp.com',
  databaseURL: 'https://mudrextodo.firebaseio.com',
  projectId: 'mudrextodo',
  storageBucket: '',
  messagingSenderId: '379073935807',
  appId: '1:379073935807:web:d5a2fbc3ade7798e'
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.firestore = app.firestore;
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name
    });
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }
}

export default new Firebase();
