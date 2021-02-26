import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDk92MhqXl1Iu-44lz0VrKiKQHd0C-0efI",
    authDomain: "restaurants-df2c1.firebaseapp.com",
    projectId: "restaurants-df2c1",
    storageBucket: "restaurants-df2c1.appspot.com",
    messagingSenderId: "667319861390",
    appId: "1:667319861390:web:4f1e8ad333e267e3d709df"
}
  
export const firebaseApp = firebase.initializeApp(firebaseConfig)