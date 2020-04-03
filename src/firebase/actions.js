import firebase from './config';
import axios from 'axios';

const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'

const auth = firebase.auth()
const providers = {
  facebook: new firebase.auth.FacebookAuthProvider(),
  google: new firebase.auth.GoogleAuthProvider()
}

async function signInWithEmailAndPassword(email, password) {
  const signIn = await auth.signInWithEmailAndPassword(email, password)
  identifyIdToken(auth.currentUser)
  return signIn
}

async function signInWithFacebook() {
  return await auth.signInWithPopup(providers.facebook)
    .then((socialAuthUser) => {
      // var token = socialAuthUser.credential.accessToken;
      // auth
      //   .user(socialAuthUser.user.uid)
      //   .set({
      //     username: socialAuthUser.additionalUserInfo.profile.name,
      //     email: socialAuthUser.additionalUserInfo.profile.email
      //   })
    })
}

async function signInWithGoogle() {
  return await auth.signInWithPopup(providers.google)
}

async function signOut() {
  return await auth.signOut()
}

const identifyIdToken = (currentUser) => {
  currentUser
    .getIdToken(true)
    .then((idToken) => {
      // axios.post(`http://${backend_url}/api/auth`, idToken)
      return idToken
    })
    .catch((error) => {
      console.log(error)
    })
}

export {
  signInWithEmailAndPassword, signInWithFacebook, signInWithGoogle, signOut
}