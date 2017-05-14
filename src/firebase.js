/* eslint-disable no-undef */
import firebase from 'firebase';
import { FIREBASE_CONFIG } from './config';


const DB_SCHEMA = 'shops';
const IMAGES = 'images';
export const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
export const auth = firebaseApp.auth();
export const storageRef = firebase.storage().ref().child(IMAGES);

export const db = firebaseApp.database();
export const dbRef = db.ref(DB_SCHEMA);

export const storageKey = "firebaseUser";

 export const isAuthenticated = () =>{
     return !!auth.currentUser || !!localStorage.getItem(storageKey);
}

export const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email,password);
}

export const logout = () => {
   return auth.signOut().then(()=>{
       window.localStorage.removeItem(storageKey);
   });
}

export const onAuthStateChanged = (callBack) =>{
  return  auth.onAuthStateChanged(user => {
        if (user) {
            window.localStorage.setItem(storageKey, user.uid);
            callBack(user.email);
        } else {
            window.localStorage.removeItem(storageKey);
            callBack(null);
        }
    });

}

export const onDataChanged = (callback) => {
    return dbRef.on('value', snapshot => {
        callback(snapshot);
    });

}

export const detachListeners = () =>{
    dbRef.off();
}

 
