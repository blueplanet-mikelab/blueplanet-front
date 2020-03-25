import firebase from './config';
import axios from 'axios';

import * as ROUTES from '../constants/routes';
const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'

const auth = firebase.auth()
const providers = {
  facebook: new firebase.auth.FacebookAuthProvider(),
  google: new firebase.auth.GoogleAuthProvider()
}

async function signUpWithEmailAndPassword(newUser) {
  const signUp = await auth.createUserWithEmailAndPassword(newUser.email, newUser.password)

  const currentUser = auth.currentUser
  currentUser.updateProfile({ displayName: newUser.displayName })
    .then(() => {
      axios.post(`http://${backend_url}/api/users/signup`, currentUser)
      identifyIdToken(currentUser)
    })
  return signUp
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

const identifyIdToken = (currentUser) => {
  currentUser.getIdToken(true)
    .then((idToken) => {
      axios.post(`http://${backend_url}/api/auth`, idToken)
    })
    .catch((error) => {
      console.log(error)
    })
}

export { signUpWithEmailAndPassword, signInWithEmailAndPassword, signInWithFacebook, signInWithGoogle }