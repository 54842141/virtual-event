import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyA_Lz43xbTNycitL438b76r-sfTQh9V_Hc',
  authDomain: 'virtual-event-67e38.firebaseapp.com',
  projectId: 'virtual-event-67e38',
  storageBucket: 'virtual-event-67e38.appspot.com',
  messagingSenderId: '731551672798',
  appId: '1:731551672798:web:1bb4eecc1f6cd87b6d154f',
  measurementId: 'G-0FY2KQM68G',
};

let production = null;
if (!firebase.apps.length) {
  production = firebase.initializeApp(config);
} else {
  production = firebase.app();
}

firebase.auth(production).signInAnonymously();

export default firebase.firestore();
