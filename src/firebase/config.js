import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBMDr6Zfo78GoCUey7YC3ABti_lHrxtcWk",
  authDomain: "blue-planet-8acf6.firebaseapp.com",
  databaseURL: "https://blue-planet-8acf6.firebaseio.com",
  projectId: "blue-planet-8acf6",
  storageBucket: "blue-planet-8acf6.appspot.com",
  messagingSenderId: "434787530852",
  appId: "1:434787530852:web:0e56b4c5efd57098fb8771",
  measurementId: "G-ZFVYQX5VWW"
};

firebase.initializeApp(firebaseConfig);

export default firebase;