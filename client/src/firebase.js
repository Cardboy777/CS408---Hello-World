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
export default firebase;


/*getCurrentUserAuth(){
        let currentuser;
        firebase.auth().onAuthStateChanged( (user) => {
            if (user) {
                // User is signed in.
                currentuser = user;
              } else {
                //no user is signed in.
                currentuser = null;
              }
        });
        return currentuser;
    }
    
    getCurrentUserData(){
        let currentuser = this.getCurrentUserAuth();
        let data;
        const db = firebase.firestore();
        const docRef = db.collection("usersPQ").doc(currentuser.uid);
        docRef.get().then( (userdoc) => {
            if (userdoc.exists) {
            data = userdoc.data();
            } else {
                data = null;
            }
        }).catch(function(error) {
          data = null
        });
    
    }*/