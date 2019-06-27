import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyA4JeeMqslqwiWxTH329gMRy9JZnllXj4I",
    authDomain: "randomletter-cf3ec.firebaseapp.com",
    databaseURL: "https://randomletter-cf3ec.firebaseio.com",
    projectId: "randomletter-cf3ec",
    storageBucket: "randomletter-cf3ec.appspot.com",
    messagingSenderId: "423204761239",
    appId: "1:423204761239:web:011efcee08c7ef7c"
}

firebase.initializeApp(config)

const db = firebase.firestore()

export default db;