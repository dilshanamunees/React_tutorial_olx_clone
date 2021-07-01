import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyCf6g7z_s7d5kG7ksQQsnC_Awm4rpvoxWk",
    authDomain: "olx-clone-64335.firebaseapp.com",
    projectId: "olx-clone-64335",
    storageBucket: "olx-clone-64335.appspot.com",
    messagingSenderId: "454750907167",
    appId: "1:454750907167:web:124379c2a1a45885191e2a",
    measurementId: "G-P0V7DHNBPQ"
  };

  export default firebase.initializeApp(firebaseConfig)