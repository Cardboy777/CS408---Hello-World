import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyB6iegdIcIdjfgIBrNsRySNSnYAiyuuf0A",
    authDomain: "cs-408-hello-world.firebaseapp.com",
    databaseURL: "https://cs-408-hello-world.firebaseio.com",
    projectId: "cs-408-hello-world",
    storageBucket: "cs-408-hello-world.appspot.com",
    messagingSenderId: "27517754739"
};
 
firebase.initializeApp(config);
export default firebase;