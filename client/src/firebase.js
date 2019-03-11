import firebase from 'firebase';
require('firebase/auth');

const config = {
    apiKey: "AIzaSyB6iegdIcIdjfgIBrNsRySNSnYAiyuuf0A",
    authDomain: "cs-408-hello-world.firebaseapp.com",
    databaseURL: "https://cs-408-hello-world.firebaseio.com",
    projectId: "cs-408-hello-world",
    storageBucket: "cs-408-hello-world.appspot.com",
    messagingSenderId: "27517754739"
};

firebase.initializeApp(config);

firebase.firestore().settings({
  timestampsInSnapshots: true
});

export const myFirebase = firebase;
export const myFirestore = firebase.firestore();
export const myStorage = firebase.storage();

export default firebase;
