import firebase from 'firebase';
 var firebaseConfig = {
    apiKey: "AIzaSyCWOGwTx6lAnYp6JBu0eR036izNrrCJvD8",
    authDomain: "personal-budget-63c6d.firebaseapp.com",
    projectId: "personal-budget-63c6d",
    storageBucket: "personal-budget-63c6d.appspot.com",
    messagingSenderId: "657519019967",
    appId: "1:657519019967:web:b1afd4eb0dda75b765c30a"
  };

const fire =   firebase.initializeApp(firebaseConfig);

export default fire;