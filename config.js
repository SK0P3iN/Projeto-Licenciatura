import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyCPluXx6H0jtndCulDxAhOU4UBydYBSrqQ",
    authDomain: "projetolicenciatura-14f39.firebaseapp.com",
    databaseURL: "https://projetolicenciatura-14f39.firebaseio.com",
    projectId: "projetolicenciatura-14f39",
    storageBucket: "projetolicenciatura-14f39.appspot.com",
    messagingSenderId: "762347927119",
    appId: "1:762347927119:web:70e6e2df69d90106589c3a",
    measurementId: "G-XMXH59X8RD"
};
let app = Firebase.initializeApp(config);
export const db = app.database();